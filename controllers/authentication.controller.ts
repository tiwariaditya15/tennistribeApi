import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

type SignUp = {
  name: string;
  username: string;
  email: string;
  password: string;
};

const prisma = new PrismaClient();

export const validateToken = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        following: {
          select: {
            username: true,
            email: true,
            name: true,
          },
        },
        followedBy: {
          select: {
            name: true,
            username: true,
            email: true,
          },
        },
      },
    });
    console.log({ user, following: user?.following });
    if (user) {
      return res.status(200).json({
        user: {
          name: user.name,
          username: user.username,
          email: user.email,
          joined: user.joined,
          following: user.following,
          followedBy: user.followedBy,
        },
      });
    }
    return res.status(404).json({ error: "User not found!" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        following: {
          select: {
            username: true,
            email: true,
            name: true,
          },
        },
        followedBy: {
          select: {
            name: true,
            username: true,
            email: true,
          },
        },
      },
    });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.sign(
          { userId: user.id },
          process.env["SECRET"] as string,
          {
            expiresIn: "24h",
          }
        );
        return res.status(200).json({
          user: {
            name: user.name,
            username: user.username,
            email: user.email,
            joined: user.joined,
            following: user.following,
            followedBy: user.followedBy,
          },
          token,
        });
      }
      return res.status(401).json({ error: "Incorrect password" });
    }
    return res.status(404).json({ error: "Incorrect username" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, username }: SignUp = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        name,
      },
    });

    const token = jwt.sign(
      { userId: newUser.id },
      process.env["SECRET"] as string,
      {
        expiresIn: "24h",
      }
    );
    return res.status(201).json({
      user: {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        joined: newUser.joined,
        following: [],
        followedBy: [],
      },
      token,
    });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

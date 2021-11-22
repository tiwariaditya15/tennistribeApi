import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare module "express-serve-static-core" {
  interface ParamsDictionary {
    userId: string;
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const users = await prisma.user.findMany({});
    if (users.length) {
      const filtered = users
        .filter((user) => user.id !== userId)
        .map((user) => ({
          email: user.email,
          username: user.email,
          name: user.name,
        }));
      return res.status(200).json({ users: filtered });
    }
    return res.status(404).json({ message: "No one is signed in." });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId }: { userId: string } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).json({ message: "User doesn't exist." });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const followUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { followId }: { followId: string } = req.body;
    const following = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          connect: {
            id: followId,
          },
        },
      },
    });
    return res.status(200).json({ following });
  } catch (error) {
    console.log({ error });
    return res.status(200).json({ error });
  }
};

export const getFollowings = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const data = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        following: true,
      },
    });
    return res.status(200).json({
      following: data?.following.map(({ email, username, name, joined }) => ({
        email,
        username,
        name,
        joined,
      })),
    });
  } catch (error) {
    console.log({ error });
    return res.status(200).json({ error });
  }
};

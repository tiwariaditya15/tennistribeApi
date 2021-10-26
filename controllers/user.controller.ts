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
const SECRET =
  "gftzGIsq5QqLb7DKsYKjFFegaIxD80uLEa7DieBbOQDASrtkfz03ms8cPIIRPozeSiFlHNHxR5arOuVsRqaRdFsl5ECjKIjDcD9qzM2S/cnHUi3IhgH7oofIYmzBCMQBQiRlPzOPk3RNAl5UtLaNEgcv/NOGLE9OjGVg9rKNBSirj8/ga5rttzEJCFjbr2lAMbLobEmoi+dbIDdIF08g/EoXQB3AgHl1PXYD48MzA1MFf9kAeZLsMYIhJSaGF9Cr6InVa1M9kCnfMLo5nks42olIMYgKBf+pfvUulMWit2buAxXVsvKI2dbMTXtzlmx9hrlfXm9AwNfKfS4wqWUizw==";

const prisma = new PrismaClient();

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: { username: string; password: string } =
      req.body;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.sign({ userId: user.id }, SECRET, {
          expiresIn: "24h",
        });
        return res.status(200).json({ token });
      }
    }
    res.status(404).json({ errorMessage: "Incorrect email!" });
  } catch (error) {
    console.log({ error });
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

    const token = jwt.sign({ userId: newUser.id }, SECRET, {
      expiresIn: "24h",
    });
    return res.status(201).json({ token });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

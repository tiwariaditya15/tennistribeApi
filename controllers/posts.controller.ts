import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const posts = await prisma.post.findMany({});
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const newPost = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { content }: { content: string } = req.body;
    const createdPost = await prisma.post.create({
      data: {
        content: content,
        reactions: 1,
        author: {
          connect: { id: userId },
        },
      },
    });
    return res.status(200).json({ createdPost });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        content: true,
        reactions: true,
        media: true,
        timestamp: true,
        author: {
          select: {
            name: true,
            username: true,
            email: true,
          },
        },
        comments: {
          select: {
            id: true,
            comment: true,
            post: true,
            author: {
              select: {
                name: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({ posts });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        content: true,
        reactions: true,
        media: true,
        timestamp: true,
        author: {
          select: {
            name: true,
            username: true,
            email: true,
          },
        },
        comments: {
          select: {
            id: true,
            comment: true,
            post: true,
            author: {
              select: {
                name: true,
                username: true,
                email: true,
              },
            },
          },
        },
      },
    });
    if (post) {
      return res.status(200).json({ post });
    }
    return res.status(404).json({ message: "Post not found" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const newPost = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { content, media }: { content: string; media?: string } = req.body;
    const createdPost = await prisma.post.create({
      data: {
        content: content,
        media: media,
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

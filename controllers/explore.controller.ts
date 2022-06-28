import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getExploreFeed = async (req: Request, res: Response) => {
  try {
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
        likedBy: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
          },
        },
        bookmarkedBy: {
          select: {
            id: true,
            username: true,
            name: true,
            email: true,
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

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const toggleReaction = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { postId }: { postId: string } = req.body;
    // find the post
    const result = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        likedBy: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
      },
    });
    //  check if this user has liked this post
    if (result?.likedBy.some((user) => user.id === userId)) {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likedBy: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
    } else {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likedBy: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    return res.status(200).json({ postId, message: "Toggled reaction!" });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

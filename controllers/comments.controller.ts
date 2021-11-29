import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getComments = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { postId }: { postId: string } = req.body;
    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });
    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const postComment = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { postId, comment }: { postId: string; comment: string } = req.body;
    const addedComment = await prisma.comment.create({
      data: {
        comment: comment,
        post: {
          connect: { id: postId },
        },
        author: {
          connect: { id: userId },
        },
      },
    });

    return res.status(200).json({ addedComment });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { postId, id }: { postId: string; id: string } = req.body;
    const deletedComment = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        comments: {
          delete: [{ id }],
        },
      },
    });
    return res
      .status(200)
      .json({ message: "Removed comment!", deleteComment, postId });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

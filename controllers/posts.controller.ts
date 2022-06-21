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

export const getFeed = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        following: {
          select: {
            id: true,
          },
        },
      },
    });
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
      where: {
        author: {
          id: {
            in: user
              ? [...user?.["following"].map((user) => user.id), userId]
              : [],
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

export const getBookmarksFeed = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const posts = await prisma.post.findMany({
      where: {
        bookmarkedBy: {
          some: {
            id: userId,
          },
        },
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
        likedBy: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
          },
        },
        bookmarkedBy: {
          select: {
            id: true,
            name: true,
            username: true,
            email: true,
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

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId }: { postId: string } = req.body;
    const delComments = prisma.comment.deleteMany({
      where: {
        postId: postId,
      },
    });
    const delPost = prisma.post.delete({
      where: {
        id: postId,
      },
    });
    await prisma.$transaction([delComments, delPost]);
    return res.status(200).json({ message: "Deleted post.", postId });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

export const toggleBookmarkPost = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { postId }: { postId: string } = req.body;
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
      select: {
        bookmarkedBy: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.bookmarkedBy.some((user) => user.id === userId)) {
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          bookmarkedBy: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
      return res.status(200).json({ meesage: "Removed bookmark." });
    }
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        bookmarkedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return res.status(200).json({ meesage: "Bookmarked." });
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

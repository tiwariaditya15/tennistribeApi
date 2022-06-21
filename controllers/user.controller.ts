import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

declare module "express-serve-static-core" {
  interface ParamsDictionary {
    userId: string;
  }
}

export const getCurrentUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        username: true,
        email: true,
        following: {
          select: {
            name: true,
            username: true,
            email: true,
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
      return res.status(200).json({ user });
    }
    return res.status(404).json({ message: "User doesn't exist." });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getProfileByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        following: {
          select: {
            name: true,
            username: true,
            email: true,
          },
        },
        followedBy: {
          select: {
            name: true,
            username: true,
            email: true,
          },
        },
        posts: {
          select: {
            id: true,
            content: true,
            reactions: true,
            media: true,
            timestamp: true,
            author: {
              select: {
                username: true,
                email: true,
                name: true,
              },
            },
            likedBy: {
              select: {
                username: true,
                email: true,
                name: true,
              },
            },
            bookmarkedBy: {
              select: {
                username: true,
                email: true,
                name: true,
              },
            },
            comments: {
              select: {
                id: true,
                comment: true,
                postId: true,
                authorId: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json({
      user: {
        email: user?.email,
        username: user?.username,
        name: user?.name,
        joined: user?.joined,
        following: user?.following,
        followedBy: user?.followedBy,
      },
      posts: user?.posts,
    });
  } catch (error) {
    console.log({ error });
    return res.status(200).json({ error });
  }
};

export const followUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { username }: { followId?: string; username: string } = req.body;

    const addToFollwedBy = prisma.user.update({
      where: {
        username,
      },
      data: {
        followedBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
    const addToFollowingOfCurrentUser = prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          connect: {
            username,
          },
        },
      },
    });
    await prisma.$transaction([addToFollwedBy, addToFollowingOfCurrentUser]);
    return res.status(200).json({ followed: true });
  } catch (error) {
    console.log({ error });
    return res.status(200).json({ error });
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { username }: { followId?: string; username: string } = req.body;

    const addToFollwedBy = prisma.user.update({
      where: {
        username,
      },
      data: {
        followedBy: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
    const addToFollowingOfCurrentUser = prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        following: {
          disconnect: {
            username,
          },
        },
      },
    });
    await prisma.$transaction([addToFollwedBy, addToFollowingOfCurrentUser]);
    return res.status(200).json({ unfollowed: true });
  } catch (error) {
    console.log({ error });
    return res.status(200).json({ error });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const users = await prisma.user.findMany({});
    console.log({ users });
    if (users.length) {
      const filtered = users
        .filter((user) => user.id !== userId)
        .map((user) => ({
          email: user.email,
          username: user.username,
          name: user.name,
        }));
      return res.status(200).json({ users: filtered });
    }
    return res.status(404).json({ message: "No one is signed in." });
  } catch (error) {
    return res.status(500).json({ error });
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

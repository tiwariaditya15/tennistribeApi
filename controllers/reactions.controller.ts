import { Request, Response } from "express";

export const addReaction = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
  } catch (error) {
    console.log({ error });
    return res.status(500).json({ error });
  }
};

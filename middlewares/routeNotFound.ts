import { Request, Response } from "express";

export const routeNotFound = (req: Request, res: Response) => {
  return res.json(404).json({ message: "No matching routes found." });
};

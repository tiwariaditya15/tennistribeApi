import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET = process.env["SECRET"] as string;

declare module "express-serve-static-core" {
  interface Request {
    userId: string;
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded: any = jwt.verify(token, SECRET);
      req.userId = decoded.userId;
      return next();
    }
    return res.status(401).json({ message: "Token is missing." });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default verifyToken;

import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const SECRET = process.env["SECRET"] as string;

declare module "express-serve-static-core" {
  interface Request {
    userId: string;
  }
}

type JWTError = {
  name: string;
  message: string;
  expiredAt: string;
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded: any = jwt.verify(token, SECRET);
      req.userId = decoded.userId;
      return next();
    }
    return res.status(401).json({ message: "Token is missing." });
  } catch (error: any) {
    if ("name" in error) {
      const jwt = error as JWTError;
      return res.status(401).json({ error: jwt });
    }
    return res.status(500).json({ error });
  }
};

export default verifyToken;

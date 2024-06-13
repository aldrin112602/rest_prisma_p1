import { NextFunction, Response } from "express";
import { RequestInterface } from "../interface/RequestInterface";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

class MiddleWare {
  constructor() {}

  middleFunction = async (
    req: RequestInterface,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.token;
      if (!token) return res.status(401).json({ message: "Token not Found" });

      const payload = jwt.verify(token as string, "secret") as {
        id: number;
        iat: number;
        exp: number;
      };

      const user = await prisma.user.findFirst({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        return res.status(401).json("user not found");
      }

      req.user = user;
      console.log("hitted from middleware.ts");
      next();
    } catch (error: any) {
      console.log(error.message);
    }
  };
}

export default MiddleWare;

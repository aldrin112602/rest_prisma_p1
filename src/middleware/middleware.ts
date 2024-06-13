require("dotenv").config();
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
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer "))
        return res.status(401).json({ message: "Token not Found" });

      const token = authHeader.split(" ")[1];

      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as {
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
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      console.log("hitted from middleware.ts");
      next();
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ error });
    }
  };
}

export default MiddleWare;


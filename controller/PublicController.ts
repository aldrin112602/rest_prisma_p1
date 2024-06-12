import { Request, Response } from "express";
import { yes } from "../types/yes";
import poolConnection from "../config/connectDb";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();


class PublicController {
  constructor() {}
  public register = async (req: Request, res: Response) => {
    console.log('register hitted', req.body)
    const {
      name,
      email,
      password
    } = req.body;

    if(!name ||
      !email ||
      !password) {
      return res.status(400).json("Fill out all the required fields");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });

    return res.status(200).json(user);
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Invalid Credentials");
    }

    const user = await prisma.user.findFirst({
      where: req.body
    });

    if (!user) return res.status(400).json("Invalid Credentials");
    const maxAge = 24 * 60 * 60;

    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: maxAge,
    });

    return res.status(200).json(token);
  };

  public getMe = async (req: Request, res: Response) => {
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

      if (!user) return res.status(401).json("user not found");
      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json("user not found");
    }
  };
}

export default PublicController;
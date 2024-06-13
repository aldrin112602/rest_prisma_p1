import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validateFields from "../helper/validator";

const prisma = new PrismaClient();

class PublicController {
  constructor() {}

  public register = async (req: Request, res: Response) => {
    const errorMessage = validateFields(req.body);
    if (errorMessage) return res.status(400).json({ error: errorMessage });

    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await prisma.user.create({
        data: {
          ...req.body,
          password: hashedPassword,
        },
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const errorMessage = validateFields(req.body);
    if (errorMessage) return res.status(400).json({ error: errorMessage });

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await bcrypt.compare(password, user?.password || ""))) {
        return res.status(400).json({ error: "Invalid Credentials" });
      }

      const maxAge = 24 * 60 * 60;
      const token = jwt.sign({ id: user.id }, "secret", {
        expiresIn: maxAge,
      });

      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  public getMe = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ error: "Token not Found" });

      const payload = jwt.verify(token, "secret") as {
        id: number;
        iat: number;
        exp: number;
      };

      const user = await prisma.user.findUnique({
        where: {
          id: payload.id,
        },
      });

      if (!user) {
        return res.status(401).json({ error: "User not Found" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(401).json({ error: "Invalid Token" });
    }
  };
}

export default PublicController;

require("dotenv").config();
import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validateFields from "../helper/validator";
import { RequestInterface } from "../interface/RequestInterface";
const prisma = new PrismaClient();

class PublicController {
  constructor() {}
  public register = async (req: RequestInterface, res: Response) => {
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
      return res.status(500).json({ error });
    }
  };

  public login = async (req: RequestInterface, res: Response) => {
    const { email, password } = req.body;
    const errorMessage = validateFields(req.body);
    if (errorMessage) return res.status(400).json({ error: errorMessage });

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user || !(await bcrypt.compare(password, user?.password ?? "")))
        return res.status(400).json({ error: "Invalid Credentials" });

      const maxAge = 24 * 60 * 60;
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: maxAge,
        }
      );

      return res.status(200).json({ ...user, token });
    } catch (error) {
      return res.status(500).json(error);
    }
  };

  public getMe = async (req: RequestInterface, res: Response) => {
    try {
      const user = req.user;
      if (!user) return res.status(401).json({ error: "User not Found" });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}

export default PublicController;

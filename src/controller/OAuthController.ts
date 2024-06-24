require("dotenv").config();
import { Response, Request } from "express";
import axios from "axios";
import jwt from "jsonwebtoken";

class OAuthController {
  constructor() {}

  public github = async (req: Request, res: Response) => {
    try {
      const { code } = req.query;
      const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;

      const params = new URLSearchParams({
        client_id: GITHUB_CLIENT_ID as string,
        client_secret: GITHUB_CLIENT_SECRET as string,
        code: code as string,
      });

      const url = `https://github.com/login/oauth/access_token`;


      const tokenResponse = await axios.post(
        url,
        params.toString(),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token } = tokenResponse.data;

      const maxAge = 24 * 60 * 60;
      const token = jwt.sign(
        { github_access_token: access_token },
        process.env.JWT_SECRET as string,
        {
          expiresIn: maxAge,
        }
      );

      const userResponse = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      });

      const userData = userResponse.data;

      res.json({ token, userData });
    } catch (error) {
      console.error("GitHub OAuth error:", error);
      return res.status(500).json({ error: "Failed to complete GitHub OAuth" });
    }
  };

  public facebook = async (req: Request, res: Response) => {

  };
}

export default OAuthController;

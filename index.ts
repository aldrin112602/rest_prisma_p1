require('dotenv').config()
import express, { Application } from "express";
import cors from "cors";
import PublicRoutes from './src/routes/PublicRoutes'
import OAuthRoutes from './src/routes/OAuthRoutes'

const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: [process.env.FE_BASE_URL as string],
    // origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
app.use(express.json());


app.use("/", PublicRoutes);
app.use("/oauth", OAuthRoutes)


app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);

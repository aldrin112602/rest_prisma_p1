require('dotenv').config()
import express, { Application } from "express";
import cors from "cors";
import PublicRoutes from './src/routes/PublicRoutes'
const app: Application = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
app.use(express.json());


app.use("/", PublicRoutes);



app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);

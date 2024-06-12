require('dotenv').config()
import express from "express";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  })
);
app.use(express.json());

app.listen(PORT, () =>
  console.log(`🚀 Server ready at: http://localhost:${PORT}`)
);

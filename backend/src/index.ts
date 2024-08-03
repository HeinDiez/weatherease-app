import express, { Request, Response } from "express";
import cors from "cors";
import http from 'http';
require('dotenv').config()

import weatherRouter from "@/weather";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/api", weatherRouter)


if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

export default app;
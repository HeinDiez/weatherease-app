import express, { Request, Response } from "express";
import cors from "cors";
import http from 'http';
require('dotenv').config()

import weatherRouter from "./routes";
import { setupSocketIO } from './sockets';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.WEATHEREASE_CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.use("/api", weatherRouter)

const server = http.createServer(app);
setupSocketIO(server);

// if (process.env.NODE_ENV !== "test") {
//   app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
//   });
// }
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
export default app;
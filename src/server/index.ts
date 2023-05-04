import express, { Express, Request, Response } from "express";

import app from "./server";
import "./db";
const PORT: number = 5000;
const path = require("path");

const handleListening = () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
};
app.listen(PORT, handleListening);

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

import express, { Express, Request, Response } from "express";

import app from "./server/server";

const path = require("path");

const PORT: number = 5000;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

import { RequestHandler } from "express";
import User from "../models/User";

export const getJoin: RequestHandler = (req, res) => res.render("SignUp");

export const postSignUp: RequestHandler = async (req, res) => {
  const { id, email, name, userName, password, password2, gender } = req.body;
  if (password !== password2) {
    return res.status(400).render("SignUp");
  }
};

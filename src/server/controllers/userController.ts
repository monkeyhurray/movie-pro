import User from "../models/User";
import bcrypt from "bcrypt";

import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface SignUpData {
  id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
  password2: string;
}

interface LoginData {
  id: string;
  password: string;
}

export const getSignUp: RequestHandler = (req, res) => res.redirect("/signUp");

export const postSignUp: RequestHandler<SignUpData> = async (req, res) => {
  const { id, email, name, userName, password, password2 } = req.body;

  if (!password2 || password !== password2) {
    return res.status(400).send("Passwords do not match");
  }

  const user = await User.findOne({ id, socialOnly: false });

  if (user) {
    const confirm = await bcrypt.compare(password, user.password);
    if (!confirm) {
      return res.status(400).json({ error: "Wrong password" });
    }
  }

  const exists = await User.exists({ $or: [{ id }, { email }, { userName }] });

  if (exists) {
    return res.status(400).json({ error: "User already exists" });
  }

  try {
    const newUser = new User({
      id,
      email,
      name,
      userName,
      password,
    });

    await newUser.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(500).send("Failed to create user");
  }
};
//로그인
export const getLogin: RequestHandler = (req, res) => {
  return res.redirect("/");
};

export const postLogin: RequestHandler<LoginData> = async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(400).send({ errorMsg: "User's not found." });
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (passwordOk) {
      req.session.loggedIn = true;
      req.session.userID = user._id;
      await req.session.save();
      const userId = req.session.userID;
      const token = jwt.sign({ userId }, process.env.JWT_SECRET);
      res.cookie("token", token, { maxAge: 3600000, httpOnly: true });

      return res.redirect("/");
    } else {
      return res.status(400).send({ errorMsg: "User's password not found." });
    }
  } catch (error) {
    console.log("controller로그인 중 오류가 발생했습니다.");
    return res
      .status(500)
      .json({ error: "catch로그인 중 오류가 발생했습니다." });
  }
};
//로그인
export const getMasterPiece: RequestHandler = (req, res) =>
  res.redirect("/masterPiece");

export const getLatestMovie: RequestHandler = (req, res) =>
  res.redirect("/latestMovie");

export const logOut: RequestHandler = (req, res) => {
  req.session.destroy;
  return res.redirect("/");
};
//로그아웃 세션삭제

//@ts-nocheck
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

interface SignUpData {
  email: string;
  name: string;
  userName: string;
  password: string;
  password2: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const getSignUp: RequestHandler = (req, res) => res.redirect("/signUp");

export const postSignUp: RequestHandler = async (req, res) => {
  const { id, email, name, userName, password, password2 }: SignUpData =
    req.body;
  if (!password2 || password !== password2) {
    return res.status(400).send("Passwords do not match");
  }

  const user = await User.findOne({ email });

  if (user) {
    const confirm = await bcrypt.compare(password, user.password);
    if (!confirm) {
      return res.status(400).json({ error: "Wrong password" });
    }
  }

  const exists = await User.exists({ $or: [{ email }, { userName }] });

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
    newUser.save();
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Failed to create user");
  }
};
//로그인
export const getLogin: RequestHandler = (req, res) => {
  return res.redirect("/login");
};

export const postLogin: RequestHandler = async (req, res) => {
  const { id, password }: LoginData = req.body;

  const user = await User.findOne({ id });

  if (!user) {
    return res.status(400).send({ errorMsg: "User's not found." });
  }

  try {
    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) {
      return res.status(400).send({ errorMsg: "User's password not found." });
    }

    req.session.loggedIn = true;
    req.session.userID = user._id;
    await req.session.save();

    const userId = req.session.userID;
    res.cookie("myToken", userId, {
      maxAge: 3600000,
      secure: true,
    });
    return res.redirect("/");
  } catch (error) {
    console.error("로그인 중 오류가 발생했습니다:", error);
  }
};
//로그인

export const getMasterPiece: RequestHandler = (req, res) =>
  res.redirect("/masterPiece");

export const getLatestMovie: RequestHandler = (req, res) =>
  res.redirect("/latestMovie");

export const getMyPage: RequestHandler = (req, res) => {
  res.redirect("/");
};

export const logOut: RequestHandler = (req, res) => {
  req.session.destroy;
  res.clearCookie("myToken");
  return res.redirect("/");
};
//로그아웃 세션삭제

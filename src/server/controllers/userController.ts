//@ts-nocheck
import User from "../models/User";
import bcrypt from "bcrypt";
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
  return res.redirect("/");
};

export const postLogin: RequestHandler = async (req, res) => {
  const { id, password }: LoginData = req.body;

  const user = await User.findOne({ id });

  if (!user) {
    console.log("아이디가 틀렸습니다.");
    return res.status(400).send({ errorMsg: "User's not found." });
  }

  try {
    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) {
      console.log("비밀번호가 틀렸습니다.");
      return res.status(400).send({ errorMsg: "User's password not found." });
    }

    req.session.loggedIn = true;
    req.session.userId = user._id;
    await req.session.save();

    const userConfirm = req.session.loggedIn;
    const userId = req.session.userId;
    const token = {
      userConfirm,
      userId,
    };
    res.cookie("myToken", token, {
      maxAge: 3600000,
    });

    return res.redirect("/");
  } catch (error) {
    console.error("로그인 중 오류가 발생했습니다:", error);
    return res.redirect("/login");
  }
};
//로그인

export const getMyPage: RequestHandler = (req, res) => {
  res.redirect("/");
};

export const logOut: RequestHandler = (req, res) => {
  req.session.destroy;
  return res.clearCookie("myToken", "video_id").redirect("/");
};
//로그아웃 세션삭제

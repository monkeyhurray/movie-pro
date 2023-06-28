import User from "../models/User";
import bcrypt from "bcrypt";

import { RequestHandler } from "express";
import { SessionData } from "express-session";
interface SignUpData {
  id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
  password2: string;
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
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      id,
      email,
      name,
      userName,
      password: hashPassword,
    });

    await newUser.save();
    return res.redirect("/login");
  } catch (error) {
    return res.status(500).send("Failed to create user");
  }
};

export const getLogin: RequestHandler = (req, res) => {
  return res.redirect("/");
};

export const postLogin: RequestHandler = async (req, res) => {
  const { id, password } = req.body;

  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(400).send({ errorMsg: "User's not found." });
    }

    const passwordOk = await bcrypt.compare(password, user.password);

    if (!passwordOk) {
      return res.status(400).send({ errorMsg: "User's password not found." });
    }

    req.session.loggedIn = true;
    req.session.user = user;

    localStorage.setItem("user", JSON.stringify(user));
    req.session.save(() => res.redirect("/"));

    return res.json({ success: true });
  } catch (error) {
    console.log("controller로그인 중 오류가 발생했습니다.");
    return res
      .status(500)
      .json({ error: "catch로그인 중 오류가 발생했습니다." });
  }
};

export const getMasterPiece: RequestHandler = (req, res) =>
  res.redirect("/masterPiece");

export const getLatestMovie: RequestHandler = (req, res) =>
  res.redirect("/latestMovie");

export const logOut: RequestHandler = (req, res) => {
  req.session.destroy;
  return res.redirect("/");
};
//가입, 로그인 만들기

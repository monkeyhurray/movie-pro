import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

import { Session } from "express-session";

interface SignUpData {
  id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
  password2: string;
}

interface CustomSessionData extends Session {
  user?: string;
}

export const getSignUp: RequestHandler = (req, res) => res.render("signUp");

export const postSignUp: RequestHandler<{}, {}, SignUpData> = async (
  req,
  res
) => {
  const { id, email, name, userName, password, password2 } = req.body;
  if (!password2 || password !== password2) {
    console.log(password);
    console.log(password2);
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

export const Login: RequestHandler = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id, socialOnly: false });
  if (!user) {
    return res.redirect("/login");
  }

  const confirm = await bcrypt.compare(password, user.password);
  if (!confirm) {
    return res.redirect("/login?error=Wrong passwordr");
  }

  const sessionData = req.session as CustomSessionData;
  sessionData.user = user.id;

  return res.redirect("/");
};

export const logOut: RequestHandler = (req, res) => {
  const sessionData = req.session as CustomSessionData;
  delete sessionData.user;
  return res.redirect("/");
};
//가입, 로그인 만들기

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
    return res.redirect("/signUp?error=Passwords do not match");
  }
  const exists = await User.exists({ $or: [{ id }, { email }, { userName }] });
  if (exists) {
    return res.redirect("/signUp?error=User already exists");
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      id,
      email,
      name,
      userName,
      password: hashPassword,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.redirect("/signUp?error=Fail to create User");
  }
};

export const logOut: RequestHandler = (req, res) => {
  const sessionData = req.session as CustomSessionData;
  delete sessionData.user;
  return res.redirect("/");
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
  return res.redirect("/");
};

//가입, 로그인 만들기

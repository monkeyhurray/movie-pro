import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import { RootState, AppDispatch } from "../../client/src/redux/store";
import { Session } from "express-session";
import {
  logInUser,
  setId,
  setPassword,
} from "../../client/src/redux/modules/user/logInUser";
import {
  setMember,
  confirmUser,
} from "../../client/src/redux/modules/user/confirmUser";
import { Store } from "@reduxjs/toolkit";

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

export const getSignUp: RequestHandler = (req, res) => res.redirect("/signUp");

export const postSignUp: RequestHandler<{}, {}, SignUpData> = async (
  req,
  res
) => {
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
  const store = req.app.get("store") as Store<RootState>;
  const { id, password } = req.body;

  try {
    const user = await User.findOne({ $and: [{ id }, { password }] });

    const dataToSubmit = {
      id,
      password,
    };

    if (user && (await bcrypt.compare(password, user.password))) {
      store.dispatch(setId(id));
      store.dispatch(setPassword(password));
      await (store.dispatch as AppDispatch)(logInUser(dataToSubmit));
      store.dispatch(setMember(true));

      return res.json({ redirectUrl: "/" });
    } else {
      console.log("아이디, 비밀번호를 확인하세요.");
      return res.redirect("/login");
    }
  } catch (error) {
    console.error("로그인 중 오류 발생");
    return res.status(500).json({ error: "로그인 중 오류가 발생했습니다." });
  }
};

export const logOut: RequestHandler = (req, res) => {
  const sessionData = req.session as CustomSessionData;
  delete sessionData.user;
  return res.redirect("/");
};
//가입, 로그인 만들기

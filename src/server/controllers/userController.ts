import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
interface SignUpData {
  id: string;
  email: string;
  name: string;
  userName: string;
  password: string;
  password2: string;
}
export const getSignUp: RequestHandler = (req, res) => res.render("SignUp");

export const postSignUp: RequestHandler<{}, {}, SignUpData> = async (
  req,
  res
) => {
  const { id, email, name, userName, password, password2 } = req.body;
  if (!password2 || password !== password2) {
    return res.status(400).render("SignUp");
  }
  const exists = await User.exists({ $or: [{ id }, { email }, { userName }] });
  if (exists) {
    return res.status(400).render("SignUp");
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
    return res.redirect("/Login");
  } catch (error) {
    return res.status(400).render("SignUp", { error: "Fail to create User" });
  }
};

export const Login: RequestHandler = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id, socialOnly: false });
  if (!user) {
    return res.status(400).render("Login", {
      errorMessage: "Does not exist",
    });
  }
  const confirm = await bcrypt.compare(password, user.password);
  if (!confirm) {
    return res.status(400).render("Login", {
      errorMessage: "Wrong password",
    });
  }

  return res.redirect("/");
};
//가입, 로그인 만들기

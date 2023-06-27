import Video from "../models/Video";
import User from "../models/User";
import { RequestHandler } from "express";

export const getWatch: RequestHandler = (req, res) => {
  return res.redirect("/watch");
};

export const postWatch: RequestHandler = (req, res) => {
  return res.redirect("/watch");
};

export const getSee: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.status(404).send({ errorMsg: "Can not find User." });
  }
  return res.redirect("/");
};

export const postSee: RequestHandler = (req, res) => {};

export const postUpload: RequestHandler = async (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(400).send("User not logged in");
  }
  const {
    user: { _id },
  } = req.session;

  const { video, thumb } = req.file;

  const { title } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      fileContent: video[0].path,
      thumb: thumb[0].path,
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch (error) {
    return res.status(400).send("Failed to create user");
  }
};

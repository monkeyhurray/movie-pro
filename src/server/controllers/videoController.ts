import Video from "../models/Video";
import User from "../models/User";
import { RequestHandler } from "express";

export const getVideoOwner: RequestHandler = async (req, res) => {
  try {
    const video = await Video.findOne({}).sort({ createdAt: 1 });
    if (video !== null) {
      const videoId = video._id;
      return res.status(200).json({ videoId });
    } else {
      return res.status(404).json({ message: "No videos found." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getWatch: RequestHandler = async (req, res) => {
  return res.redirect("/video");
};

export const getSee: RequestHandler = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.status(404).send({ errorMsg: "Can not find User." });
  }

  return res.status(200).json({ video });
};

export const getUpload: RequestHandler = (req, res) => {
  return res.redirect("/video/upload");
};

export const postUpload: RequestHandler = async (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(400).send("User not logged in");
  }
  const _id = req.session.userId;
  const videFile = req.file;
  const { title, owner, genre, actors } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      videoUrl: videFile.path,
      owner,
      genre,
      actors,
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    req.session.videoId = newVideo._id;
    req.session.videoUrl = newVideo.videoUrl;

    const videoSessionId = req.session.videoId;
    const videoSessionUrl = req.session.videoUrl;

    res.cookie("videoId", videoSessionId);
    res.cookie("videoUrl", videoSessionUrl);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Failed to create user");
  }
};

export const postWatch: RequestHandler = (req, res) => {
  return res.redirect("/video");
};
export const getMovie: RequestHandler = (req, res) => {
  return res.redirect("/video/movie");
};
export const postMovie: RequestHandler = (req, res) => {
  return res.redirect("/video/movie");
};

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

export const getSee: RequestHandler = async (req, res) => {
  const { fileUrlId } = req.params;

  const video = await Video.findById(fileUrlId).populate("owner");
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
  const { title, owner, genre, actors, introduce } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      videoUrl: videFile.path,
      owner,
      genre,
      actors,
      introduce,
    });

    const user = await User.findById(_id);

    user.videos.push(newVideo._id);
    user.save();
    req.session.videoId = newVideo._id;
    let videoSessionId = req.session.videoId;
    res.cookie("videoId", videoSessionId);

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(400).send("Failed to create user");
  }
};

export const getMovie: RequestHandler = (req, res) => {
  return res.redirect("/video/movie");
};

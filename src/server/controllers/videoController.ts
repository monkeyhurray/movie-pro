import Video from "../models/Video";
import User from "../models/User";
import { RequestHandler } from "express";

export const postUpload: RequestHandler = async (req, res) => {
  const { _id } = req.session.user;
  const { video, thumb } = req.file;
  const { title, description } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      owner: _id,
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch (error) {
    return res.status(400).send("Failed to create user");
  }
};

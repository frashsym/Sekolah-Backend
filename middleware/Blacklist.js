import Blacklist from "../models/BlacklistModel.js";

export const checkBlacklist = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const token = authHeader.split(' ')[1];

  const blacklisted = await Blacklist.findOne({ token });
  if (blacklisted) {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  next();
};
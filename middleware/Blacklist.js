import Blacklist from "../models/BlacklistModel.js";

export const checkBlacklist = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  const blacklisted = await Blacklist.findOne({ where: { token } });
  if (blacklisted) {
    return res.status(401).json({ message: "Token tidak valid" });
  }

  next();
};

import argon2 from "argon2";
import Users from "../models/UsersModel.js";
import jwt from "jsonwebtoken";
import Blacklist from "../models/BlacklistModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Periksa password
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Kirim token ke frontend
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

export const logout = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    // Masukkan token ke dalam blacklist
    await Blacklist.create({ token });
    res.clearCookie("token"); // Menghapus cookie token
  }
  res.status(200).json({ message: "Logout berhasil" }); // Mengirimkan pesan sukses
};

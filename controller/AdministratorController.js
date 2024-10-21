import argon2 from "argon2";
import Users from "../models/UsersModel.js";
import jwt from "jsonwebtoken";
import Blacklist from "../models/BlacklistModel.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cari user berdasarkan username
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    // Verifikasi password dengan argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d", // Token berlaku selama 1 hari
    });

    // Simpan token di dalam cookie
    res.cookie('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', // hanya aktif di production (HTTPS)
      sameSite: 'strict', // atau 'lax' jika butuh kompatibilitas lintas domain
    });

    // Kirim respons sukses
    res.status(200).json({ message: "Login berhasil", token });
  } catch (error) {
    // Tangani error server
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};


// controllers/authController.js (atau nama lain sesuai strukturmu)
export const logout = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Token tidak ditemukan" });
  }

  try {
    // Tambahkan token ke dalam blacklist jika diperlukan
    await Blacklist.create({ token });

    // Hapus cookie token
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // Hanya berlaku di HTTPS
    });

    // Kirimkan respons sukses
    res.status(200).json({ message: "Logout berhasil" });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};


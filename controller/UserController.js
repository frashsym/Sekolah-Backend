// Import dependencies yang diperlukan
import Users from "../models/UsersModel.js"; // Model untuk tabel pengguna
import path from "path"; // Modul untuk bekerja dengan path file dan direktori
import fs from "fs"; // Modul untuk berinteraksi dengan sistem file
import argon2 from "argon2"; // Modul untuk hashing password
import multer from "multer"; // Modul untuk meng-handle file upload

// Fungsi untuk mendapatkan semua data pengguna
export const GetUsers = async (req, res) => {
  try {
    // Mengambil semua data pengguna dari database, hanya mengambil atribut yang ditentukan
    const response = await Users.findAll({
      attributes: [
        "id",
        "username",
        "nama_lengkap",
        "email",
        "no_tlp",
        "role",
        "url",
      ],
    });
    // Mengirimkan data pengguna dengan status 200 (OK)
    res.status(200).json(response);
  } catch (error) {
    // Mengirimkan pesan error dengan status 500 (Internal Server Error)
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk mendapatkan data pengguna berdasarkan ID
export const GetUserById = async (req, res) => {
  try {
    // Mencari pengguna berdasarkan ID yang diterima dari parameter route
    const user = await Users.findByPk(req.params.id, {
      attributes: [
        "id",
        "username",
        "nama_lengkap",
        "email",
        "no_tlp",
        "role",
        "url",
      ],
    });
    if (user) {
      // Mengirimkan data pengguna dengan status 200 (OK)
      res.status(200).json(user);
    } else {
      // Mengirimkan pesan error jika pengguna tidak ditemukan dengan status 404 (Not Found)
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    // Mengirimkan pesan error dengan status 500 (Internal Server Error)
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk membuat pengguna baru
export const CreateUser = async (req, res) => {
  // Mengambil data dari body request
  const { username, password, nama_lengkap, email, no_tlp, role, blokir } =
    req.body;

  // Hash password menggunakan argon2
  const hashPassword = await argon2.hash(password);

  // Cek apakah ada file yang diupload
  if (!req.files || !req.files.file) {
    return res.status(422).json({ msg: "Harus memasukkan foto" }); // Pesan error jika tidak ada file yang diupload
  }

  const file = req.files.file; // Ambil file yang diupload
  const fileSize = file.data.length; // Ukuran file
  const ext = path.extname(file.name); // Ekstensi file
  const fileName = file.md5 + ext; // Nama file dengan hash md5 untuk menghindari duplikasi nama file
  const url = `${req.protocol}://${req.get("host")}/user/${fileName}`; // URL file yang akan disimpan di database
  const allowedType = [".png", ".jpg", ".jpeg"]; // Tipe file yang diizinkan

  // Cek tipe file yang diizinkan
  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });

  // Cek ukuran file (harus kurang dari 5MB)
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  const uploadPath = `./public/images/user/${fileName}`; // Path penyimpanan file

  // Pindahkan file ke path yang ditentukan
  file.mv(uploadPath, async (err) => {
    if (err) return res.status(500).json({ msg: err.message }); // Jika ada error saat memindahkan file
    try {
      // Simpan data pengguna baru ke database
      await Users.create({
        username: username,
        password: hashPassword,
        nama_lengkap: nama_lengkap,
        email: email,
        no_tlp: no_tlp,
        role: role,
        blokir: blokir,
        foto: fileName,
        url,
      });
      res.status(201).json({ msg: "User created successfully" }); // Mengirimkan pesan sukses dengan status 201 (Created)
    } catch (error) {
      res.status(400).json({ msg: error.message }); // Mengirimkan pesan error dengan status 400 (Bad Request)
    }
  });
};

// Fungsi untuk memperbarui data pengguna
export const UpdateUser = async (req, res) => {
  // Mencari pengguna berdasarkan ID
  const user = await Users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "User not found" }); // Pesan error jika pengguna tidak ditemukan

  // Mengambil data dari body request
  const { username, nama_lengkap, email, no_telp, password, role, blokir } =
    req.body;
  let hashPassword = user.password; // Inisialisasi password dengan password yang ada
  let fileName = user.foto; // Inisialisasi nama file dengan foto yang ada

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan foto" }); // Pesan error jika tidak ada file yang diupload
    }

    const file = req.files.file; // Ambil file yang diupload
    const fileSize = file.data.length; // Ukuran file
    const ext = path.extname(file.name); // Ekstensi file
    fileName = file.md5 + ext; // Nama file baru
    const allowedType = [".png", ".jpg", ".jpeg"]; // Tipe file yang diizinkan

    // Cek tipe file yang diizinkan
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    // Cek ukuran file (harus kurang dari 5MB)
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/user/${user.foto}`; // Path file lama
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath); // Hapus file lama jika ada
    }

    // Pindahkan file baru ke path yang ditentukan
    file.mv(`./public/images/user/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message }); // Jika ada error saat memindahkan file
    });
  }

  const url = `${req.protocol}://${req.get("host")}/user/${fileName}`; // URL file baru

  // Hash password baru jika diberikan dan berbeda dengan yang ada di database
  if (password && password !== user.password) {
    hashPassword = await argon2.hash(password);
  }

  try {
    // Update data pengguna di database
    await Users.update(
      {
        username: username,
        nama_lengkap: nama_lengkap,
        email: email,
        no_telp: no_telp,
        password: hashPassword,
        role: role,
        blokir: blokir,
        foto: fileName,
        url,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(201).json({ msg: "User updated successfully" }); // Mengirimkan pesan sukses dengan status 201 (Created)
  } catch (error) {
    res.status(400).json({ msg: error.message }); // Mengirimkan pesan error dengan status 400 (Bad Request)
  }
};

// Fungsi untuk menghapus pengguna
export const DeleteUser = async (req, res) => {
  try {
    // Mencari pengguna berdasarkan ID
    const user = await Users.findOne({
      where: {
        id: req.params.id, // Mencari pengguna berdasarkan id dari parameter route
      },
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" }); // Pesan error jika pengguna tidak ditemukan

    // Hapus file gambar dari direktori
    const filepath = `./public/images/user/${user.foto}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath); // Menghapus file jika ada
    }

    await user.destroy(); // Menghapus data pengguna dari database

    res.status(200).json({ msg: `Berhasil Delete` }); // Mengirimkan pesan sukses dengan status 200 (OK)
  } catch (error) {
    res.status(400).json({ msg: error.message }); // Mengirimkan pesan error dengan status 400 (Bad Request)
  }
};

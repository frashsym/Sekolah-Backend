// Masih salah, nanti di perbaiki
import HalamanStatis from "../models/HalamanStatisModel.js";
import path from "path";
import fs from "fs";

// Create a new halaman statis
export const CreateHalamanStatis = async (req, res) => {
  const {
    judul,
    judul_seo,
    isi_halaman,
    username,
    dibaca,
    hari,
    urutan,
    kelompok,
  } = req.body;

  const tgl_posting = new Date().toISOString().split("T")[0];
  const jam = new Date()
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":");

  if (!req.files || !req.files.file) {
    return res.status(422).json({ msg: "Harus memasukkan foto" });
  }

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });

  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  const uploadPath = `./public/images/${fileName}`;

  file.mv(uploadPath, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await HalamanStatis.create({
        judul: judul,
        judul_seo: judul_seo,
        isi_halaman: isi_halaman,
        tgl_posting: tgl_posting,
        gambar: fileName,
        url_gambar: url_gambar,
        username: username,
        dibaca: dibaca,
        jam: jam,
        hari: hari,
        urutan: urutan,
        kelompok: kelompok,
      });
      res.status(201).json({ msg: "Halaman statis berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all halaman statis
export const GetAllHalamanStatis = async (req, res) => {
  try {
    const response = await HalamanStatis.findAll({
      attributes: [
        "judul",
        "judul_seo",
        "isi_halaman",
        "tgl_posting",
        "gambar",
        "url_gambar",
        "username",
        "dibaca",
        "jam",
        "hari",
        "urutan",
        "kelompok",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single halaman statis by ID
export const GetHalamanStatisById = async (req, res) => {
  try {
    const halamanStatis = await HalamanStatis.findByPk(req.params.id);
    if (halamanStatis) {
      res.status(200).json(halamanStatis);
    } else {
      res.status(404).json({ message: "Halaman Statis not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a halaman statis by ID
export const UpdateHalamanStatis = async (req, res) => {
  // Mencari halaman statis berdasarkan ID
  const halamanStatis = await HalamanStatis.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!halamanStatis)
    return res.status(404).json({ msg: "Halaman Statis tidak ditemukan" });

  // Mengambil data dari body request
  const {
    judul,
    judul_seo,
    isi_halaman,
    username,
    dibaca,
    hari,
    urutan,
    kelompok,
  } = req.body;

  const tgl_posting = new Date().toISOString().split("T")[0];
  const jam = new Date()
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":");

  let fileName = halamanStatis.gambar; // Inisialisasi nama file dengan gambar yang ada

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan foto" });
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

    const filepath = `./public/images/${halamanStatis.gambar}`; // Path file lama
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath); // Hapus file lama jika ada
    }

    // Pindahkan file baru ke path yang ditentukan
    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message }); // Jika ada error saat memindahkan file
    });
  }

  const url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`; // URL file baru

  try {
    // Update data halaman statis di database
    await HalamanStatis.update(
      {
        judul: judul,
        judul_seo: judul_seo,
        isi_halaman: isi_halaman,
        tgl_posting: tgl_posting,
        gambar: fileName,
        url_gambar: url_gambar,
        username: username,
        dibaca: dibaca,
        jam: jam,
        hari: hari,
        urutan: urutan,
        kelompok: kelompok,
      },
      {
        where: {
          id: halamanStatis.id,
        },
      }
    );
    res.status(201).json({ msg: "Halaman Statis berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a halaman statis by ID
export const DeleteHalamanStatis = async (req, res) => {
  try {
    // Mencari halaman statis berdasarkan ID
    const halamanStatis = await HalamanStatis.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!halamanStatis)
      return res.status(404).json({ msg: "Halaman Statis tidak ditemukan" });

    // Hapus file gambar dari direktori
    const filepath = `./public/images/${halamanStatis.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath); // Menghapus file jika ada
    }

    await halamanStatis.destroy(); // Menghapus data halaman statis dari database

    res.status(200).json({ msg: "Halaman Statis berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

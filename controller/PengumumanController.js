import Pengumuman from "../models/PengumumanModel.js";
import path from "path";
import fs from "fs";

// Create a new pengumuman
export const CreatePengumuman = async (req, res) => {
  const { judul, keterangan, username } = req.body;

  // Set tanggal ke tanggal saat ini
  const tanggal = new Date();

  if (!req.files || !req.files.file) {
    return res.status(422).json({ msg: "Harus memasukkan file" });
  }

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const uploadPath = `./public/images/${fileName}`;
  const allowedType = [".pdf", ".doc", ".docx", ".jpg"]; // Contoh tipe file yang diizinkan

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid File Type" });

  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5 MB" });

  // Buat url_download berdasarkan nama file
  const url_download = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  file.mv(uploadPath, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Pengumuman.create({
        judul,
        keterangan,
        file_download: fileName,
        url_download, // Gunakan url_download yang sudah dibuat
        username,
        tanggal,
      });
      res.status(201).json({ msg: "Pengumuman berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all pengumuman
export const GetAllPengumuman = async (req, res) => {
  try {
    const response = await Pengumuman.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single pengumuman by ID
export const GetPengumumanById = async (req, res) => {
  try {
    const pengumuman = await Pengumuman.findByPk(req.params.id);
    if (pengumuman) {
      res.status(200).json(pengumuman);
    } else {
      res.status(404).json({ message: "Pengumuman tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a pengumuman by ID
export const UpdatePengumuman = async (req, res) => {
  const pengumuman = await Pengumuman.findOne({ where: { id: req.params.id } });

  if (!pengumuman) return res.status(404).json({ msg: "Pengumuman tidak ditemukan" });

  const { judul, keterangan, username } = req.body;
  let fileName = pengumuman.file_download;
  let url_download = pengumuman.url_download; // Inisialisasi dengan nilai lama

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan file" });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    url_download = `${req.protocol}://${req.get("host")}/images/${fileName}`; // Buat url_download baru
    const uploadPath = `./public/images/${fileName}`;
    const allowedType = [".pdf", ".doc", ".docx", ".jpg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid File Type" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "File must be less than 5 MB" });

    const filepath = `./public/images/${pengumuman.file_download}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(uploadPath, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  try {
    await Pengumuman.update(
      { judul, keterangan, file_download: fileName, url_download, username, tanggal: pengumuman.tanggal },
      { where: { id: pengumuman.id } }
    );
    res.status(201).json({ msg: "Pengumuman berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a pengumuman by ID
export const DeletePengumuman = async (req, res) => {
  try {
    const pengumuman = await Pengumuman.findOne({ where: { id: req.params.id } });

    if (!pengumuman) return res.status(404).json({ msg: "Pengumuman tidak ditemukan" });

    const filepath = `./public/images/${pengumuman.file_download}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await pengumuman.destroy();
    res.status(200).json({ msg: "Pengumuman berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
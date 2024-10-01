import PasangIklan from "../models/PasangIklanModel.js";
import path from "path";
import fs from "fs";

// Create a new pasang iklan
export const CreatePasangIklan = async (req, res) => {
  const { judul, username, url } = req.body;

  // Set tanggal posting ke tanggal saat ini
  const tgl_posting = new Date();

  if (!req.files || !req.files.file) {
    return res.status(422).json({ msg: "Harus memasukkan gambar" });
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
      await PasangIklan.create({
        judul,
        username,
        url,
        gambar: fileName,
        url_gambar,
        tgl_posting,
      });
      res.status(201).json({ msg: "Iklan berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all pasang iklan
export const GetAllPasangIklan = async (req, res) => {
  try {
    const response = await PasangIklan.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single pasang iklan by ID
export const GetPasangIklanById = async (req, res) => {
  try {
    const iklan = await PasangIklan.findByPk(req.params.id);
    if (iklan) {
      res.status(200).json(iklan);
    } else {
      res.status(404).json({ message: "Iklan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a pasang iklan by ID
export const UpdatePasangIklan = async (req, res) => {
  const iklan = await PasangIklan.findOne({ where: { id: req.params.id } });

  if (!iklan) return res.status(404).json({ msg: "Iklan tidak ditemukan" });

  const { judul, username, url } = req.body;
  const tgl_posting = iklan.tgl_posting;
  let fileName = iklan.gambar;
  let url_gambar = iklan.url_gambar;

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan gambar" });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${iklan.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  try {
    await PasangIklan.update(
      { judul, username, url, gambar: fileName, url_gambar, tgl_posting },
      { where: { id: iklan.id } }
    );
    res.status(201).json({ msg: "Iklan berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a pasang iklan by ID
export const DeletePasangIklan = async (req, res) => {
  try {
    const iklan = await PasangIklan.findOne({ where: { id: req.params.id } });

    if (!iklan) return res.status(404).json({ msg: "Iklan tidak ditemukan" });

    const filepath = `./public/images/${iklan.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await iklan.destroy();
    res.status(200).json({ msg: "Iklan berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
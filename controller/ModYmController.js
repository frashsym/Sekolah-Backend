import ModYm from "../models/ModYmModel.js";
import path from "path";
import fs from "fs";

// Create a new mod_ym
export const CreateModYm = async (req, res) => {
  const { nama, username, ym_icon, url } = req.body;

  if (!req.files || !req.files.file) {
    return res.status(422).json({ msg: "Harus memasukkan ikon" });
  }

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url_icon = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });

  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  const uploadPath = `./public/images/${fileName}`;

  file.mv(uploadPath, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await ModYm.create({
        nama,
        username,
        ym_icon: fileName,
        url: url_icon,
      });
      res.status(201).json({ msg: "ModYm berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all mod_ym
export const GetAllModYm = async (req, res) => {
  try {
    const response = await ModYm.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single mod_ym by ID
export const GetModYmById = async (req, res) => {
  try {
    const modYm = await ModYm.findByPk(req.params.id);
    if (modYm) {
      res.status(200).json(modYm);
    } else {
      res.status(404).json({ message: "ModYm tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a mod_ym by ID
export const UpdateModYm = async (req, res) => {
  const modYm = await ModYm.findOne({ where: { id: req.params.id } });

  if (!modYm) return res.status(404).json({ msg: "ModYm tidak ditemukan" });

  const { nama, username } = req.body;
  let fileName = modYm.ym_icon;
  let url_icon = modYm.url;

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan ikon" });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    url_icon = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${modYm.ym_icon}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  try {
    await ModYm.update(
      { nama, username, ym_icon: fileName, url: url_icon },
      { where: { id: modYm.id } }
    );
    res.status(201).json({ msg: "ModYm berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a mod_ym by ID
export const DeleteModYm = async (req, res) => {
  try {
    const modYm = await ModYm.findOne({ where: { id: req.params.id } });

    if (!modYm) return res.status(404).json({ msg: "ModYm tidak ditemukan" });

    const filepath = `./public/images/${modYm.ym_icon}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await modYm.destroy();
    res.status(200).json({ msg: "ModYm berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
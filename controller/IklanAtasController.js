import IklanAtas from "../models/IklanAtasModel.js";
import path from "path";
import fs from "fs";

// Create a new iklan atas
export const CreateIklanAtas = async (req, res) => {
  const { judul, username, url } = req.body;

  const tgl_posting = new Date().toISOString().split("T")[0];

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
      await IklanAtas.create({
        judul,
        username,
        url,
        gambar: fileName,
        url_gambar,
        tgl_posting,
      });
      res.status(201).json({ msg: "Iklan Atas berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all iklan atas
export const GetAllIklanAtas = async (req, res) => {
  try {
    const response = await IklanAtas.findAll({
      attributes: [
        "id",
        "judul",
        "username",
        "url",
        "gambar",
        "url_gambar",
        "tgl_posting",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single iklan atas by ID
export const GetIklanAtasById = async (req, res) => {
  try {
    const iklanAtas = await IklanAtas.findByPk(req.params.id);
    if (iklanAtas) {
      res.status(200).json(iklanAtas);
    } else {
      res.status(404).json({ message: "Iklan Atas tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a iklan atas by ID
export const UpdateIklanAtas = async (req, res) => {
  const iklanAtas = await IklanAtas.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!iklanAtas)
    return res.status(404).json({ msg: "Iklan Atas tidak ditemukan" });

  const { judul, username, url } = req.body;

  const tgl_posting = new Date().toISOString().split("T")[0];

  let fileName = iklanAtas.gambar;

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan foto" });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${iklanAtas.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await IklanAtas.update(
      {
        judul,
        username,
        url,
        gambar: fileName,
        url_gambar,
        tgl_posting,
      },
      {
        where: {
          id: iklanAtas.id,
        },
      }
    );
    res.status(201).json({ msg: "Iklan Atas berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a iklan atas by ID
export const DeleteIklanAtas = async (req, res) => {
  try {
    const iklanAtas = await IklanAtas.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!iklanAtas)
      return res.status(404).json({ msg: "Iklan Atas tidak ditemukan" });

    const filepath = `./public/images/${iklanAtas.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await iklanAtas.destroy();

    res.status(200).json({ msg: "Iklan Atas berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

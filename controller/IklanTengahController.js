import IklanTengah from "../models/IklanTengahModel.js";
import path from "path";
import fs from "fs";

// Create a new iklan tengah
export const CreateIklanTengah = async (req, res) => {
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
      await IklanTengah.create({
        judul,
        username,
        url,
        gambar: fileName,
        url_gambar,
        tgl_posting,
      });
      res.status(201).json({ msg: "Iklan Tengah berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all iklan tengah
export const GetAllIklanTengah = async (req, res) => {
  try {
    const response = await IklanTengah.findAll({
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

// Get a single iklan tengah by ID
export const GetIklanTengahById = async (req, res) => {
  try {
    const iklanTengah = await IklanTengah.findByPk(req.params.id);
    if (iklanTengah) {
      res.status(200).json(iklanTengah);
    } else {
      res.status(404).json({ message: "Iklan Tengah tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a iklan tengah by ID
export const UpdateIklanTengah = async (req, res) => {
  const iklanTengah = await IklanTengah.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!iklanTengah)
    return res.status(404).json({ msg: "Iklan Tengah tidak ditemukan" });

  const { judul, username, url } = req.body;

  const tgl_posting = new Date().toISOString().split("T")[0];
  
  let fileName = iklanTengah.gambar;

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

    const filepath = `./public/images/${iklanTengah.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await IklanTengah.update(
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
          id: iklanTengah.id,
        },
      }
    );
    res.status(201).json({ msg: "Iklan Tengah berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a iklan tengah by ID
export const DeleteIklanTengah = async (req, res) => {
  try {
    const iklanTengah = await IklanTengah.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!iklanTengah)
      return res.status(404).json({ msg: "Iklan Tengah tidak ditemukan" });

    const filepath = `./public/images/${iklanTengah.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await iklanTengah.destroy();

    res.status(200).json({ msg: "Iklan Tengah berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

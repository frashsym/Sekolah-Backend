import Identitas from "../models/IdentitasModel.js";
import path from "path";
import fs from "fs";

// Create a new identitas
export const CreateIdentitas = async (req, res) => {
  const {
    nama_website,
    email,
    url,
    facebook,
    rekening,
    no_telp,
    meta_deskripsi,
    meta_keyword,
    maps
  } = req.body;

  if (!req.files || !req.files.favicon) {
    return res.status(422).json({ msg: "Harus memasukkan favicon" });
  }

  const file = req.files.favicon;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const faviconUrl = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg", ".ico"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });

  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  const uploadPath = `./public/images/${fileName}`;

  file.mv(uploadPath, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Identitas.create({
        nama_website,
        email,
        url,
        facebook,
        rekening,
        no_telp,
        meta_deskripsi,
        meta_keyword,
        favicon: fileName,
        maps
      });
      res.status(201).json({ msg: "Identitas berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all identitas
export const GetAllIdentitas = async (req, res) => {
  try {
    const response = await Identitas.findAll({
      attributes: [
        "id",
        "nama_website",
        "email",
        "url",
        "facebook",
        "rekening",
        "no_telp",
        "meta_deskripsi",
        "meta_keyword",
        "favicon",
        "maps"
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single identitas by ID
export const GetIdentitasById = async (req, res) => {
  try {
    const identitas = await Identitas.findByPk(req.params.id);
    if (identitas) {
      res.status(200).json(identitas);
    } else {
      res.status(404).json({ message: "Identitas tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a identitas by ID
export const UpdateIdentitas = async (req, res) => {
  const identitas = await Identitas.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!identitas) return res.status(404).json({ msg: "Identitas tidak ditemukan" });

  const {
    nama_website,
    email,
    url,
    facebook,
    rekening,
    no_telp,
    meta_deskripsi,
    meta_keyword,
    maps
  } = req.body;
  let fileName = identitas.favicon;

  if (req.files) {
    if (!req.files.favicon) {
      return res.status(422).json({ msg: "Harus memasukkan favicon" });
    }

    const file = req.files.favicon;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".png", ".jpg", ".jpeg", ".ico"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${identitas.favicon}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  try {
    await Identitas.update(
      {
        nama_website,
        email,
        url,
        facebook,
        rekening,
        no_telp,
        meta_deskripsi,
        meta_keyword,
        favicon: fileName,
        maps
      },
      {
        where: {
          id: identitas.id,
        },
      }
    );
    res.status(201).json({ msg: "Identitas berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a identitas by ID
export const DeleteIdentitas = async (req, res) => {
  try {
    const identitas = await Identitas.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!identitas) return res.status(404).json({ msg: "Identitas tidak ditemukan" });

    const filepath = `./public/images/${identitas.favicon}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await identitas.destroy();

    res.status(200).json({ msg: "Identitas berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
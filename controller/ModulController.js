import Modul from "../models/ModulModel.js";
import path from "path";
import fs from "fs";

// Create a new modul
export const CreateModul = async (req, res) => {
  const {
    nama_modul,
    username,
    link,
    static_content,
    gambar,
    url,
    publish,
    status,
    aktif,
    urutan,
    link_seo,
  } = req.body;

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
      await Modul.create({
        nama_modul,
        username,
        link,
        static_content,
        gambar: fileName,
        url: url_gambar,
        publish,
        status,
        aktif,
        urutan,
        link_seo,
      });
      res.status(201).json({ msg: "Modul berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all modul
export const GetAllModul = async (req, res) => {
  try {
    const response = await Modul.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single modul by ID
export const GetModulById = async (req, res) => {
  try {
    const modul = await Modul.findByPk(req.params.id);
    if (modul) {
      res.status(200).json(modul);
    } else {
      res.status(404).json({ message: "Modul tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a modul by ID
export const UpdateModul = async (req, res) => {
  const modul = await Modul.findOne({ where: { id: req.params.id } });

  if (!modul) return res.status(404).json({ msg: "Modul tidak ditemukan" });

  const {
    nama_modul,
    username,
    link,
    static_content,
    publish,
    status,
    aktif,
    urutan,
    link_seo,
  } = req.body;
  let fileName = modul.gambar;

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan gambar" });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url_gambar = `${req.protocol}://${req.get(
      "host"
    )}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${modul.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    try {
      await Modul.update(
        {
          nama_modul,
          username,
          link,
          static_content,
          gambar: fileName,
          url: url_gambar,
          publish,
          status,
          aktif,
          urutan,
          link_seo,
        },
        { where: { id: modul.id } }
      );
      res.status(201).json({ msg: "Modul berhasil diperbarui" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};

// Delete a modul by ID
export const DeleteModul = async (req, res) => {
  try {
    const modul = await Modul.findOne({ where: { id: req.params.id } });

    if (!modul) return res.status(404).json({ msg: "Modul tidak ditemukan" });

    const filepath = `./public/images/${modul.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await modul.destroy();
    res.status(200).json({ msg: "Modul berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

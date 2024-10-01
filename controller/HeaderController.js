import Header from "../models/HeaderModel.js";
import path from "path";
import fs from "fs";

// Create a new header
export const CreateHeader = async (req, res) => {
  const { judul, url } = req.body;
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
      await Header.create({
        judul,
        url,
        gambar: fileName,
        url_gambar,
        tgl_posting,
      });
      res.status(201).json({ msg: "Header berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all headers
export const GetAllHeaders = async (req, res) => {
  try {
    const response = await Header.findAll({
      attributes: ["id", "judul", "url", "gambar", "url_gambar", "tgl_posting"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single header by ID
export const GetHeaderById = async (req, res) => {
  try {
    const header = await Header.findByPk(req.params.id);
    if (header) {
      res.status(200).json(header);
    } else {
      res.status(404).json({ message: "Header not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a header by ID
export const UpdateHeader = async (req, res) => {
  const header = await Header.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!header) return res.status(404).json({ msg: "Header tidak ditemukan" });

  const { judul, url } = req.body;

  const tgl_posting = new Date().toISOString().split("T")[0];
  let fileName = header.gambar;

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

    const filepath = `./public/images/${header.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Header.update(
      {
        judul,
        url,
        gambar: fileName,
        url_gambar,
        tgl_posting,
      },
      {
        where: {
          id: header.id,
        },
      }
    );
    res.status(201).json({ msg: "Header berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a header by ID
export const DeleteHeader = async (req, res) => {
  try {
    const header = await Header.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!header) return res.status(404).json({ msg: "Header tidak ditemukan" });

    const filepath = `./public/images/${header.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await header.destroy();

    res.status(200).json({ msg: "Header berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

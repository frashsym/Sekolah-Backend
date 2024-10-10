import SekilasInfo from "../models/SekilasInfoModel.js";
import path from "path";
import fs from "fs";

// Create a new SekilasInfo
export const CreateSekilasInfo = async (req, res) => {
  const { info, aktif } = req.body;

  if (!req.files || !req.files.file) {
    return res.status(422).json({ msg: "Harus memasukkan gambar" });
  }

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });

  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  const uploadPath = `./public/images/${fileName}`;

  file.mv(uploadPath, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await SekilasInfo.create({
        info: info,
        tgl_posting: new Date(),
        gambar: fileName,
        url: url,
        aktif: aktif,
      });
      res.status(201).json({ msg: "Sekilas Info berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all SekilasInfo
export const GetAllSekilasInfo = async (req, res) => {
  try {
    const response = await SekilasInfo.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single SekilasInfo by ID
export const GetSekilasInfoById = async (req, res) => {
  try {
    const sekilasInfo = await SekilasInfo.findByPk(req.params.id);
    if (sekilasInfo) {
      res.status(200).json(sekilasInfo);
    } else {
      res.status(404).json({ message: "Sekilas Info tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a SekilasInfo by ID
export const UpdateSekilasInfo = async (req, res) => {
  const sekilasInfo = await SekilasInfo.findOne({
    where: { id: req.params.id },
  });

  if (!sekilasInfo) return res.status(404).json({ msg: "Sekilas Info tidak ditemukan" });

  const { info, aktif } = req.body;
  let fileName = sekilasInfo.gambar;

  // Definisikan allowedType di sini
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan gambar" });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${sekilasInfo.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await SekilasInfo.update(
      { info: info, gambar: fileName, url: url, aktif: aktif },
      { where: { id: sekilasInfo.id } }
    );
    res.status(201).json({ msg: "Sekilas Info berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a SekilasInfo by ID
export const DeleteSekilasInfo = async (req, res) => {
  try {
    const sekilasInfo = await SekilasInfo.findOne({
      where: { id: req.params.id },
    });

    if (!sekilasInfo) return res.status(404).json({ msg: "Sekilas Info tidak ditemukan" });

    const filepath = `./public/images/${sekilasInfo.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await sekilasInfo.destroy();
    res.status(200).json({ msg: "Sekilas Info berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
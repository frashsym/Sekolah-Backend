import Background from "../models/BackgroundModel.js";
import path from "path";
import fs from "fs";

// Create a new background
export const CreateBackground = async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(422).json({ msg: "Harus memasukkan foto" });
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
      await Background.create({
        gambar: fileName,
        url: url,
      });
      res.status(201).json({ msg: "Background berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all backgrounds
export const GetAllBackgrounds = async (req, res) => {
  try {
    const response = await Background.findAll({
      attributes: ["id", "gambar", "url"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single background by ID
export const GetBackgroundById = async (req, res) => {
  try {
    const background = await Background.findByPk(req.params.id);
    if (background) {
      res.status(200).json(background);
    } else {
      res.status(404).json({ message: "Background not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a background by ID
export const UpdateBackground = async (req, res) => {
  const background = await Background.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!background) return res.status(404).json({ msg: "Background tidak ditemukan" });

  let fileName = background.gambar;

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

    const filepath = `./public/images/${background.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Background.update(
      {
        gambar: fileName,
        url: url,
      },
      {
        where: {
          id: background.id,
        },
      }
    );
    res.status(201).json({ msg: "Background berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a background by ID
export const DeleteBackground = async (req, res) => {
  try {
    const background = await Background.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!background) return res.status(404).json({ msg: "Background tidak ditemukan" });

    const filepath = `./public/images/${background.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await background.destroy();

    res.status(200).json({ msg: "Background berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
import Banner from "../models/BannerModel.js";
import path from "path";
import fs from "fs";

// Create a new banner
export const CreateBanner = async (req, res) => {
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
      await Banner.create({
        judul,
        url,
        gambar: fileName,
        url_gambar,
        tgl_posting,
      });
      res.status(201).json({ msg: "Banner berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all banners
export const GetAllBanners = async (req, res) => {
  try {
    const response = await Banner.findAll({
      attributes: ["id", "judul", "url", "gambar", "url_gambar", "tgl_posting"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single banner by ID
export const GetBannerById = async (req, res) => {
  try {
    const banner = await Banner.findByPk(req.params.id);
    if (banner) {
      res.status(200).json(banner);
    } else {
      res.status(404).json({ message: "Banner not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a banner by ID
export const UpdateBanner = async (req, res) => {
  const banner = await Banner.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!banner) return res.status(404).json({ msg: "Banner tidak ditemukan" });

  const { judul, url } = req.body;
  const tgl_posting = new Date().toISOString().split("T")[0];
  let fileName = banner.gambar;

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

    const filepath = `./public/images/${banner.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Banner.update(
      {
        judul,
        url,
        gambar: fileName,
        url_gambar,
        tgl_posting,
      },
      {
        where: {
          id: banner.id,
        },
      }
    );
    res.status(201).json({ msg: "Banner berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a banner by ID
export const DeleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!banner) return res.status(404).json({ msg: "Banner tidak ditemukan" });

    const filepath = `./public/images/${banner.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await banner.destroy();

    res.status(200).json({ msg: "Banner berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

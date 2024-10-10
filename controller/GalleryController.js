import Gallery from "../models/GalleryModel.js";
import path from "path";
import fs from "fs";

// Create a new gallery item
export const CreateGallery = async (req, res) => {
  const {
    id_album,
    username,
    jdl_gallery,
    gallery_seo,
    keterangan,
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
      await Gallery.create({
        id_album,
        username,
        jdl_gallery,
        gallery_seo,
        keterangan,
        gambar: fileName,
        url_gambar,
      });
      res.status(201).json({ msg: "Gallery berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all gallery items
export const GetAllGallery = async (req, res) => {
  try {
    const response = await Gallery.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single gallery item by ID
export const GetGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id);
    if (gallery) {
      res.status(200).json(gallery);
    } else {
      res.status(404).json({ message: "Gallery not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a gallery item by ID
export const UpdateGallery = async (req, res) => {
  const gallery = await Gallery.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!gallery) return res.status(404).json({ msg: "Gallery tidak ditemukan" });

  const {
    id_album,
    username,
    jdl_gallery,
    gallery_seo,
    keterangan,
  } = req.body;

  let fileName = gallery.gambar;

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan gambar" });
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

    const filepath = `./public/images/${gallery.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Gallery.update(
      {
        id_album,
        username,
        jdl_gallery,
        gallery_seo,
        keterangan,
        gambar: fileName,
        url_gambar,
      },
      {
        where: {
          id: gallery.id,
        },
      }
    );
    res.status(201).json({ msg: "Gallery berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a gallery item by ID
export const DeleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!gallery) return res.status(404).json({ msg: "Gallery tidak ditemukan" });

    const filepath = `./public/images/${gallery.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await gallery.destroy();

    res.status(200).json({ msg: "Gallery berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

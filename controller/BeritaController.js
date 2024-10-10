import Berita from "../models/BeritaModel.js";
import path from "path";
import fs from "fs";

// Create a new berita
export const CreateBerita = async (req, res) => {
  const {
    id_kategori,
    username,
    judul,
    sub_judul,
    youtube,
    judul_seo,
    headline,
    aktif,
    utama,
    isi_berita,
    keterangan_gambar,
    hari,
    tanggal,
    jam,
    dibaca,
    tag,
    status,
  } = req.body;

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
      await Berita.create({
        id_kategori,
        username,
        judul,
        sub_judul,
        youtube,
        judul_seo,
        headline,
        aktif,
        utama,
        isi_berita,
        keterangan_gambar,
        hari,
        tanggal,
        jam,
        gambar: fileName,
        url_gambar,
        dibaca,
        tag,
        status,
      });
      res.status(201).json({ msg: "Berita berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all berita
export const GetAllBerita = async (req, res) => {
  try {
    const response = await Berita.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single berita by ID
export const GetBeritaById = async (req, res) => {
  try {
    const berita = await Berita.findByPk(req.params.id);
    if (berita) {
      res.status(200).json(berita);
    } else {
      res.status(404).json({ message: "Berita not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a berita by ID
export const UpdateBerita = async (req, res) => {
  const berita = await Berita.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!berita) return res.status(404).json({ msg: "Berita tidak ditemukan" });

  const {
    id_kategori,
    username,
    judul,
    sub_judul,
    youtube,
    judul_seo,
    headline,
    aktif,
    utama,
    isi_berita,
    keterangan_gambar,
    hari,
    tanggal,
    jam,
    dibaca,
    tag,
    status,
  } = req.body;

  let fileName = berita.gambar;

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

    const filepath = `./public/images/${berita.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Berita.update(
      {
        id_kategori,
        username,
        judul,
        sub_judul,
        youtube,
        judul_seo,
        headline,
        aktif,
        utama,
        isi_berita,
        keterangan_gambar,
        hari,
        tanggal,
        jam,
        gambar: fileName,
        url_gambar,
        dibaca,
        tag,
        status,
      },
      {
        where: {
          id: berita.id,
        },
      }
    );
    res.status(201).json({ msg: "Berita berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a berita by ID
export const DeleteBerita = async (req, res) => {
  try {
    const berita = await Berita.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!berita) return res.status(404).json({ msg: "Berita tidak ditemukan" });

    const filepath = `./public/images/${berita.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await berita.destroy();

    res.status(200).json({ msg: "Berita berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

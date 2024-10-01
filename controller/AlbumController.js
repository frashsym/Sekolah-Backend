import Album from "../models/AlbumModel.js";
import path from "path";
import fs from "fs";

// Create a new album
export const createAlbum = async (req, res) => {
  const {
    jdl_album,
    album_seo,
    keterangan,
    jam,
    hari,
    username,
    aktif,
    hits_album,
  } = req.body;

  const tgl_posting = new Date().toISOString().split("T")[0];

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
      await Album.create({
        jdl_album,
        album_seo,
        keterangan,
        gbr_album: fileName,
        url,
        tgl_posting,
        jam,
        hari,
        username,
        aktif,
        hits_album,
      });
      res.status(201).json({ msg: "Album berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all albums
export const getAllAlbums = async (req, res) => {
  try {
    const response = await Album.findAll({
      attributes: [
        "jdl_album",
        "album_seo",
        "keterangan",
        "gbr_album",
        "url",
        "tgl_posting",
        "jam",
        "hari",
        "username",
        "aktif",
        "hits_album",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single album by ID
export const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findByPk(req.params.id);
    if (album) {
      res.status(200).json(album);
    } else {
      res.status(404).json({ message: "Album not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an album by ID
export const updateAlbum = async (req, res) => {
  const album = await Album.findOne({
    where: {
      id_album: req.params.id,
    },
  });

  if (!album) return res.status(404).json({ msg: "Album tidak ditemukan" });

  const {
    jdl_album,
    album_seo,
    keterangan,
    jam,
    hari,
    username,
    aktif,
    hits_album,
  } = req.body;
  const tgl_posting = new Date().toISOString().split("T")[0];
  let fileName = album.gbr_album;

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

    const filepath = `./public/images/${album.gbr_album}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Album.update(
      {
        jdl_album,
        album_seo,
        keterangan,
        gbr_album: fileName,
        url,
        tgl_posting,
        jam,
        hari,
        username,
        aktif,
        hits_album,
      },
      {
        where: {
          id_album: album.id_album,
        },
      }
    );
    res.status(201).json({ msg: "Album berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete an album by ID
export const deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findOne({
      where: {
        id_album: req.params.id,
      },
    });

    if (!album) return res.status(404).json({ msg: "Album tidak ditemukan" });

    const filepath = `./public/images/${album.gbr_album}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await album.destroy();

    res.status(200).json({ msg: "Album berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

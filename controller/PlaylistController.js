import Playlist from "../models/PlaylistModel.js";
import path from "path";
import fs from "fs";

// Create a new playlist
export const CreatePlaylist = async (req, res) => {
  const { jdl_playlist, username } = req.body;

  // Set tanggal ke tanggal saat ini
  const tanggal = new Date();

  if (!req.files || !req.files.file) {
    return res.status(422).json({ msg: "Harus memasukkan gambar" });
  }

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const uploadPath = `./public/images/${fileName}`;
  const allowedType = [".jpg", ".jpeg", ".png"]; // Contoh tipe file yang diizinkan

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid File Type" });

  if (fileSize > 5000000)
    return res.status(422).json({ msg: "File must be less than 5 MB" });

  // Buat url_gambar berdasarkan nama file
  const url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  file.mv(uploadPath, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Playlist.create({
        jdl_playlist,
        username,
        gbr_playlist: fileName,
        url_gambar, // Gunakan url_gambar yang sudah dibuat
      });
      res.status(201).json({ msg: "Playlist berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all playlists
export const GetAllPlaylists = async (req, res) => {
  try {
    const response = await Playlist.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single playlist by ID
export const GetPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (playlist) {
      res.status(200).json(playlist);
    } else {
      res.status(404).json({ message: "Playlist tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a playlist by ID
export const UpdatePlaylist = async (req, res) => {
  const playlist = await Playlist.findOne({ where: { id: req.params.id } });

  if (!playlist) return res.status(404).json({ msg: "Playlist tidak ditemukan" });

  const { jdl_playlist, username } = req.body;
  let fileName = playlist.gbr_playlist;
  let url_gambar = playlist.url_gambar; // Inisialisasi dengan nilai lama

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan gambar" });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`; // Buat url_gambar baru
    const uploadPath = `./public/images/${fileName}`;
    const allowedType = [".jpg", ".jpeg", ".png"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid File Type" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "File must be less than 5 MB" });

    const filepath = `./public/images/${playlist.gbr_playlist}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(uploadPath, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  try {
    await Playlist.update(
      { jdl_playlist, username, gbr_playlist: fileName, url_gambar }, // Gunakan url_gambar yang baru
      { where: { id: playlist.id } }
    );
    res.status(201).json({ msg: "Playlist berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a playlist by ID
export const DeletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOne({ where: { id: req.params.id } });

    if (!playlist) return res.status(404).json({ msg: "Playlist tidak ditemukan" });

    const filepath = `./public/images/${playlist.gbr_playlist}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await playlist.destroy();
    res.status(200).json({ msg: "Playlist berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
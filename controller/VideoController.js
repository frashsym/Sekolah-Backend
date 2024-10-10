import Video from "../models/VideoModel.js";
import path from "path";
import fs from "fs";

// Create a new Video
export const CreateVideo = async (req, res) => {
  const { id_playlist, username, jdl_video, keterangan, dilihat, hari, tanggal, jam, tagvid } = req.body;

  if (!req.files || !req.files.file) {
    return res.status(422).json({ msg: "Harus memasukkan gambar video" });
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
      await Video.create({
        id_playlist,
        username,
        jdl_video,
        keterangan,
        gbr_video: fileName,
        url_gbr_video: url,
        dilihat,
        hari,
        tanggal,
        jam,
        tagvid,
      });
      res.status(201).json({ msg: "Video berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all Videos
export const GetAllVideos = async (req, res) => {
  try {
    const response = await Video.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single Video by ID
export const GetVideoById = async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (video) {
      res.status(200).json(video);
    } else {
      res.status(404).json({ message: "Video tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Video by ID
export const UpdateVideo = async (req, res) => {
  const video = await Video.findOne({
    where: { id: req.params.id },
  });

  if (!video) return res.status(404).json({ msg: "Video tidak ditemukan" });

  const { id_playlist, username, jdl_video, keterangan, dilihat, hari, tanggal, jam, tagvid } = req.body;
  let fileName = video.gbr_video;

  const allowedType = [".png", ".jpg", ".jpeg"];

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan gambar video" });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${video.gbr_video}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Video.update(
      { id_playlist, username, jdl_video, keterangan, gbr_video: fileName, url_gbr_video: url, dilihat, hari, tanggal, jam, tagvid },
      { where: { id: video.id } }
    );
    res.status(201).json({ msg: "Video berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a Video by ID
export const DeleteVideo = async (req, res) => {
  try {
    const video = await Video.findOne({
      where: { id: req.params.id },
    });

    if (!video) return res.status(404).json({ msg: "Video tidak ditemukan" });

    const filepath = `./public/images/${video.gbr_video}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await video.destroy();
    res.status(200).json({ msg: "Video berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
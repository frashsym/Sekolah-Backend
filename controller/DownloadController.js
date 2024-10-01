import Download from "../models/DownloadModel.js";
import path from "path";
import fs from "fs";

// Create a new download
export const CreateDownload = async (req, res) => {
  const { judul, nama_file, url, hits } = req.body;
  
  const tgl_posting = new Date().toISOString().split("T")[0];

  if (!req.files || !req.files.file) {
    return res.status(422).json({ msg: "Harus memasukkan file" });
  }

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const fileUrl = `${req.protocol}://${req.get("host")}/files/${fileName}`;
  const allowedType = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".jpg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid File Type" });

  if (fileSize > 10000000)
    return res.status(422).json({ msg: "File must be less than 10 MB" });

  const uploadPath = `./public/images/${fileName}`;

  file.mv(uploadPath, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Download.create({
        judul,
        nama_file: fileName,
        url: fileUrl,
        tgl_posting,
        hits,
      });
      res.status(201).json({ msg: "Download berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all downloads
export const GetAllDownloads = async (req, res) => {
  try {
    const response = await Download.findAll({
      attributes: ["id", "judul", "nama_file", "url", "tgl_posting", "hits"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single download by ID
export const GetDownloadById = async (req, res) => {
  try {
    const download = await Download.findByPk(req.params.id);
    if (download) {
      res.status(200).json(download);
    } else {
      res.status(404).json({ message: "Download not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a download by ID
export const UpdateDownload = async (req, res) => {
  const download = await Download.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!download) return res.status(404).json({ msg: "Download tidak ditemukan" });

  const { judul, nama_file, url, hits } = req.body;
  const tgl_posting = new Date().toISOString().split("T")[0];
  let fileName = download.nama_file;

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan file" });
    }

    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".jpg"];

    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid File Type" });

    if (fileSize > 10000000)
      return res.status(422).json({ msg: "File must be less than 10 MB" });

    const filepath = `./public/images/${download.nama_file}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/files/${fileName}`;

  try {
    await Download.update(
      {
        judul,
        nama_file: fileName,
        url: fileUrl,
        tgl_posting,
        hits,
      },
      {
        where: {
          id: download.id,
        },
      }
    );
    res.status(201).json({ msg: "Download berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a download by ID
export const DeleteDownload = async (req, res) => {
  try {
    const download = await Download.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!download) return res.status(404).json({ msg: "Download tidak ditemukan" });

    const filepath = `./public/images/${download.nama_file}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await download.destroy();

    res.status(200).json({ msg: "Download berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
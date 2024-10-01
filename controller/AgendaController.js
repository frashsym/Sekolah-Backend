import Agenda from "../models/AgendaModel.js";
import path from "path";
import fs from "fs";

// Create a new agenda
export const CreateAgenda = async (req, res) => {
  const { tema, tema_seo, isi_agenda, tempat, pengirim, dibaca, username } =
    req.body;

  const tgl_mulai = new Date().toISOString().split("T")[0];
  const tgl_posting = new Date().toISOString().split("T")[0];
  const tgl_selesai = new Date().toISOString().split("T")[0];
  const jam = new Date()
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":");

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
      await Agenda.create({
        tema: tema,
        tema_seo: tema_seo,
        isi_agenda: isi_agenda,
        tempat: tempat,
        pengirim: pengirim,
        tgl_mulai: tgl_mulai,
        tgl_selesai: tgl_selesai,
        tgl_posting: tgl_posting,
        gambar: fileName,
        url: url,
        jam: jam,
        dibaca: dibaca,
        username: username,
      });
      res.status(201).json({ msg: "Agenda berhasil dibuat" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  });
};

// Get all agenda
export const GetAllAgenda = async (req, res) => {
  try {
    const response = await Agenda.findAll({
      attributes: [
        "tema",
        "tema_seo",
        "isi_agenda",
        "tempat",
        "pengirim",
        "tgl_mulai",
        "tgl_selesai",
        "tgl_posting",
        "gambar",
        "url",
        "jam",
        "dibaca",
        "username",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single agenda by ID
export const GetAgendaById = async (req, res) => {
  try {
    const agenda = await Agenda.findByPk(req.params.id);
    if (agenda) {
      res.status(200).json(agenda);
    } else {
      res.status(404).json({ message: "Agenda not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a agenda by ID
export const UpdateAgenda = async (req, res) => {
  // Mencari agenda berdasarkan ID
  const agenda = await Agenda.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!agenda) return res.status(404).json({ msg: "Agenda tidak ditemukan" });

  // Mengambil data dari body request
  const { tema, tema_seo, isi_agenda, tempat, pengirim, dibaca, username } =
    req.body;

  const tgl_mulai = new Date().toISOString().split("T")[0];
  const tgl_posting = new Date().toISOString().split("T")[0];
  const tgl_selesai = new Date().toISOString().split("T")[0];
  const jam = new Date()
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":");

  let fileName = agenda.gambar; // Inisialisasi nama file dengan gambar yang ada

  if (req.files) {
    if (!req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan foto" });
    }

    const file = req.files.file; // Ambil file yang diupload
    const fileSize = file.data.length; // Ukuran file
    const ext = path.extname(file.name); // Ekstensi file
    fileName = file.md5 + ext; // Nama file baru
    const allowedType = [".png", ".jpg", ".jpeg"]; // Tipe file yang diizinkan

    // Cek tipe file yang diizinkan
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });

    // Cek ukuran file (harus kurang dari 5MB)
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });

    const filepath = `./public/images/${agenda.gambar}`; // Path file lama
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath); // Hapus file lama jika ada
    }

    // Pindahkan file baru ke path yang ditentukan
    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message }); // Jika ada error saat memindahkan file
    });
  }

  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`; // URL file baru

  try {
    // Update data agenda di database
    await Agenda.update(
      {
        tema: tema,
        tema_seo: tema_seo,
        isi_agenda: isi_agenda,
        tempat: tempat,
        pengirim: pengirim,
        tgl_mulai: tgl_mulai,
        tgl_selesai: tgl_selesai,
        tgl_posting: tgl_posting,
        gambar: fileName,
        url: url,
        jam: jam,
        dibaca: dibaca,
        username: username,
      },
      {
        where: {
          id: agenda.id,
        },
      }
    );
    res.status(201).json({ msg: "Agenda berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a agenda by ID
export const DeleteAgenda = async (req, res) => {
  try {
    // Mencari agenda berdasarkan ID
    const agenda = await Agenda.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!agenda) return res.status(404).json({ msg: "Agenda tidak ditemukan" });

    // Hapus file gambar dari direktori
    const filepath = `./public/images/${agenda.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath); // Menghapus file jika ada
    }

    await agenda.destroy(); // Menghapus data agenda dari database

    res.status(200).json({ msg: "Agenda berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

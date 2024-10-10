import Komentar from "../models/KomentarModel.js";

// Create a new komentar
export const CreateKomentar = async (req, res) => {
  const { id_berita, nama_komentar, url, isi_komentar, tgl, jam_komentar, aktif, email } = req.body;

  try {
    await Komentar.create({
      id_berita,
      nama_komentar,
      url,
      isi_komentar,
      tgl,
      jam_komentar,
      aktif,
      email,
    });
    res.status(201).json({ msg: "Komentar berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all komentar
export const GetAllKomentar = async (req, res) => {
  try {
    const response = await Komentar.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single komentar by ID
export const GetKomentarById = async (req, res) => {
  try {
    const komentar = await Komentar.findByPk(req.params.id);
    if (komentar) {
      res.status(200).json(komentar);
    } else {
      res.status(404).json({ message: "Komentar not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a komentar by ID
export const UpdateKomentar = async (req, res) => {
  const komentar = await Komentar.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!komentar) return res.status(404).json({ msg: "Komentar tidak ditemukan" });

  const { id_berita, nama_komentar, url, isi_komentar, tgl, jam_komentar, aktif, email } = req.body;

  try {
    await Komentar.update(
      {
        id_berita,
        nama_komentar,
        url,
        isi_komentar,
        tgl,
        jam_komentar,
        aktif,
        email,
      },
      {
        where: {
          id: komentar.id,
        },
      }
    );
    res.status(200).json({ msg: "Komentar berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a komentar by ID
export const DeleteKomentar = async (req, res) => {
  try {
    const komentar = await Komentar.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!komentar) return res.status(404).json({ msg: "Komentar tidak ditemukan" });

    await komentar.destroy();

    res.status(200).json({ msg: "Komentar berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

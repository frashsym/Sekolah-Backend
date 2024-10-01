import KataJelek from "../models/KataJelekModel.js";

// Create a new kata jelek
export const CreateKataJelek = async (req, res) => {
  const { kata, username, ganti } = req.body;

  try {
    await KataJelek.create({
      kata,
      username,
      ganti,
    });
    res.status(201).json({ msg: "Kata Jelek berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all kata jelek
export const GetAllKataJelek = async (req, res) => {
  try {
    const response = await KataJelek.findAll({
      attributes: ["id", "kata", "username", "ganti"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single kata jelek by ID
export const GetKataJelekById = async (req, res) => {
  try {
    const kataJelek = await KataJelek.findByPk(req.params.id);
    if (kataJelek) {
      res.status(200).json(kataJelek);
    } else {
      res.status(404).json({ message: "Kata Jelek tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a kata jelek by ID
export const UpdateKataJelek = async (req, res) => {
  const kataJelek = await KataJelek.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!kataJelek) return res.status(404).json({ msg: "Kata Jelek tidak ditemukan" });

  const { kata, username, ganti } = req.body;

  try {
    await KataJelek.update(
      {
        kata,
        username,
        ganti,
      },
      {
        where: {
          id: kataJelek.id,
        },
      }
    );
    res.status(201).json({ msg: "Kata Jelek berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a kata jelek by ID
export const DeleteKataJelek = async (req, res) => {
  try {
    const kataJelek = await KataJelek.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kataJelek) return res.status(404).json({ msg: "Kata Jelek tidak ditemukan" });

    await kataJelek.destroy();

    res.status(200).json({ msg: "Kata Jelek berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
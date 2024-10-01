import Hubungi from "../models/HubungiModel.js";

// Create a new hubungi
export const CreateHubungi = async (req, res) => {
  const { nama, email, subjek, pesan, dibaca } = req.body;
  const tanggal = new Date().toISOString().split("T")[0];
  const jam = new Date()
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":");

  try {
    await Hubungi.create({
      nama,
      email,
      subjek,
      pesan,
      tanggal,
      jam,
      dibaca,
    });
    res.status(201).json({ msg: "Pesan berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all hubungi
export const GetAllHubungi = async (req, res) => {
  try {
    const response = await Hubungi.findAll({
      attributes: [
        "id",
        "nama",
        "email",
        "subjek",
        "pesan",
        "tanggal",
        "jam",
        "dibaca",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single hubungi by ID
export const GetHubungiById = async (req, res) => {
  try {
    const hubungi = await Hubungi.findByPk(req.params.id);
    if (hubungi) {
      res.status(200).json(hubungi);
    } else {
      res.status(404).json({ message: "Pesan tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a hubungi by ID
export const UpdateHubungi = async (req, res) => {
  const hubungi = await Hubungi.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!hubungi) return res.status(404).json({ msg: "Pesan tidak ditemukan" });

  const { nama, email, subjek, pesan, tanggal, jam, dibaca } = req.body;

  try {
    await Hubungi.update(
      {
        nama,
        email,
        subjek,
        pesan,
        tanggal,
        jam,
        dibaca,
      },
      {
        where: {
          id: hubungi.id,
        },
      }
    );
    res.status(201).json({ msg: "Pesan berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a hubungi by ID
export const DeleteHubungi = async (req, res) => {
  try {
    const hubungi = await Hubungi.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!hubungi) return res.status(404).json({ msg: "Pesan tidak ditemukan" });

    await hubungi.destroy();

    res.status(200).json({ msg: "Pesan berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

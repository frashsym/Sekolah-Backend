import Statistik from "../models/StatistikModel.js"; // Import model Statistik

// Create a new statistik
export const CreateStatistik = async (req, res) => {
  const { ip, tanggal, hits, online } = req.body;

  try {
    await Statistik.create({ ip, tanggal, hits, online });
    res.status(201).json({ msg: "Statistik berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all statistik
export const GetAllStatistik = async (req, res) => {
  try {
    const response = await Statistik.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single statistik by ID
export const GetStatistikById = async (req, res) => {
  try {
    const statistik = await Statistik.findByPk(req.params.id);
    if (statistik) {
      res.status(200).json(statistik);
    } else {
      res.status(404).json({ message: "Statistik tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a statistik by ID
export const UpdateStatistik = async (req, res) => {
  const statistik = await Statistik.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!statistik) return res.status(404).json({ msg: "Statistik tidak ditemukan" });

  const { ip, tanggal, hits, online } = req.body;

  try {
    await Statistik.update({ ip, tanggal, hits, online }, { where: { id: statistik.id } });
    res.status(201).json({ msg: "Statistik berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a statistik by ID
export const DeleteStatistik = async (req, res) => {
  try {
    const statistik = await Statistik.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!statistik) return res.status(404).json({ msg: "Statistik tidak ditemukan" });

    await statistik.destroy();
    res.status(200).json({ msg: "Statistik berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

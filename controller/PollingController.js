import Polling from "../models/PollingModel.js";

// Create a new polling
export const CreatePolling = async (req, res) => {
  const { pilihan, status, username, rating, aktif } = req.body;

  try {
    const polling = await Polling.create({
      pilihan,
      status,
      username,
      rating,
      aktif,
    });
    res.status(201).json({ msg: "Polling berhasil dibuat", polling });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all polling
export const GetAllPolling = async (req, res) => {
  try {
    const response = await Polling.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single polling by ID
export const GetPollingById = async (req, res) => {
  try {
    const polling = await Polling.findByPk(req.params.id);
    if (polling) {
      res.status(200).json(polling);
    } else {
      res.status(404).json({ message: "Polling tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a polling by ID
export const UpdatePolling = async (req, res) => {
  const polling = await Polling.findOne({ where: { id: req.params.id } });

  if (!polling) return res.status(404).json({ msg: "Polling tidak ditemukan" });

  const { pilihan, status, username, rating, aktif } = req.body;

  try {
    await Polling.update(
      { pilihan, status, username, rating, aktif },
      { where: { id: polling.id } }
    );
    res.status(201).json({ msg: "Polling berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a polling by ID
export const DeletePolling = async (req, res) => {
  try {
    const polling = await Polling.findOne({ where: { id: req.params.id } });

    if (!polling) return res.status(404).json({ msg: "Polling tidak ditemukan" });

    await polling.destroy();
    res.status(200).json({ msg: "Polling berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
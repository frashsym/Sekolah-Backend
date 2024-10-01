import ModAlamat from "../models/ModAlamatModel.js";

// Create a new Alamat
export const CreateModAlamat = async (req, res) => {
  const { alamat } = req.body;

  try {
    await ModAlamat.create({
        alamat
    });
    res.status(201).json({ msg: "Alamat berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all Alamat
export const GetAllModAlamat = async (req, res) => {
  try {
    const response = await ModAlamat.findAll({
      attributes: ["id", "alamat"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single Alamat by ID
export const GetModAlamatById = async (req, res) => {
  try {
    const Alamat = await ModAlamat.findByPk(req.params.id);
    if (Alamat) {
      res.status(200).json(Alamat);
    } else {
      res.status(404).json({ message: "Alamat tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Alamat by ID
export const UpdateModAlamat = async (req, res) => {
  const Alamat = await ModAlamat.findByPk(req.params.id);
  
  if (!Alamat) return res.status(404).json({ msg: "Alamat tidak ditemukan" });
  
  const { alamat } = req.body;

  try {
    await ModAlamat.update(
      {
        alamat,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).json({ msg: "Alamat berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a Alamat by ID
export const DeleteModAlamat = async (req, res) => {
  try {
    const Alamat = await ModAlamat.findByPk(req.params.id);

    if (!Alamat) return res.status(404).json({ msg: "Alamat tidak ditemukan" });

    await Alamat.destroy();

    res.status(200).json({ msg: "Alamat berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
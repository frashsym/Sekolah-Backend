import Kategori from "../models/KategoriModel.js";

// Create a new kategori
export const CreateKategori = async (req, res) => {
  const { nama_kategori, username, kategori_seo, aktif, sidebar } = req.body;

  const tanggal = new Date().toISOString().split("T")[0];

  try {
    await Kategori.create({
      nama_kategori,
      username,
      kategori_seo,
      aktif,
      sidebar,
      tanggal,
    });
    res.status(201).json({ msg: "Kategori berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all kategori
export const GetAllKategori = async (req, res) => {
  try {
    const response = await Kategori.findAll({
      attributes: ["id", "nama_kategori", "username", "kategori_seo", "aktif", "sidebar", "tanggal"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single kategori by ID
export const GetKategoriById = async (req, res) => {
  try {
    const kategori = await Kategori.findByPk(req.params.id);
    if (kategori) {
      res.status(200).json(kategori);
    } else {
      res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a kategori by ID
export const UpdateKategori = async (req, res) => {
  const kategori = await Kategori.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!kategori) return res.status(404).json({ msg: "Kategori tidak ditemukan" });

  const { nama_kategori, username, kategori_seo, aktif, sidebar } = req.body;

  const tanggal = new Date().toISOString().split("T")[0];

  try {
    await Kategori.update(
      {
        nama_kategori,
        username,
        kategori_seo,
        aktif,
        sidebar,
        tanggal,
      },
      {
        where: {
          id: kategori.id,
        },
      }
    );
    res.status(201).json({ msg: "Kategori berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a kategori by ID
export const DeleteKategori = async (req, res) => {
  try {
    const kategori = await Kategori.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!kategori) return res.status(404).json({ msg: "Kategori tidak ditemukan" });

    await kategori.destroy();

    res.status(200).json({ msg: "Kategori berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
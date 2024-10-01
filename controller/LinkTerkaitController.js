import LinkTerkait from "../models/LinkTerkaitModel.js";

// Create a new link terkait
export const CreateLinkTerkait = async (req, res) => {
  const { judul, singkatan, url } = req.body;

  try {
    await LinkTerkait.create({
      judul,
      singkatan,
      url,
    });
    res.status(201).json({ msg: "Link Terkait berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all link terkait
export const GetAllLinkTerkait = async (req, res) => {
  try {
    const response = await LinkTerkait.findAll({
      attributes: ["id", "judul", "singkatan", "url"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single link terkait by ID
export const GetLinkTerkaitById = async (req, res) => {
  try {
    const linkTerkait = await LinkTerkait.findByPk(req.params.id);
    if (linkTerkait) {
      res.status(200).json(linkTerkait);
    } else {
      res.status(404).json({ message: "Link Terkait tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a link terkait by ID
export const UpdateLinkTerkait = async (req, res) => {
  const linkTerkait = await LinkTerkait.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!linkTerkait) return res.status(404).json({ msg: "Link Terkait tidak ditemukan" });

  const { judul, singkatan, url } = req.body;

  try {
    await LinkTerkait.update(
      {
        judul,
        singkatan,
        url,
      },
      {
        where: {
          id: linkTerkait.id,
        },
      }
    );
    res.status(201).json({ msg: "Link Terkait berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a link terkait by ID
export const DeleteLinkTerkait = async (req, res) => {
  try {
    const linkTerkait = await LinkTerkait.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!linkTerkait) return res.status(404).json({ msg: "Link Terkait tidak ditemukan" });

    await linkTerkait.destroy();

    res.status(200).json({ msg: "Link Terkait berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
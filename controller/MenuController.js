import Menu from "../models/MenuModel.js"; // Import model Menu

// Create a new menu
export const CreateMenu = async (req, res) => {
  const { id_parent, link, aktif, position } = req.body;

  try {
    await Menu.create({
      id_parent,
      link,
      aktif,
      position,
    });
    res.status(201).json({ msg: "Menu berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all menu
export const GetAllMenu = async (req, res) => {
  try {
    const response = await Menu.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single menu by ID
export const GetMenuById = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (menu) {
      res.status(200).json(menu);
    } else {
      res.status(404).json({ message: "Menu tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a menu by ID
export const UpdateMenu = async (req, res) => {
  const menu = await Menu.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!menu) return res.status(404).json({ msg: "Menu tidak ditemukan" });

  const { id_parent, link, aktif, position } = req.body;

  try {
    await Menu.update(
      { id_parent, link, aktif, position },
      { where: { id: menu.id } }
    );
    res.status(201).json({ msg: "Menu berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a menu by ID
export const DeleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!menu) return res.status(404).json({ msg: "Menu tidak ditemukan" });

    await menu.destroy();
    res.status(200).json({ msg: "Menu berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

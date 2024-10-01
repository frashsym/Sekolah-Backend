import Menu from "../models/MenuModel.js";

// Create a new menu
export const CreateMenu = async (req, res) => {
  const { id_parent, nama_menu, link, aktif, position, urutan } = req.body;

  try {
    const menu = await Menu.create({
      id_parent,
      nama_menu,
      link,
      aktif,
      position,
      urutan,
    });
    res.status(201).json({ msg: "Menu berhasil dibuat", menu });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all menus
export const GetAllMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.status(200).json(menus);
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
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a menu by ID
export const UpdateMenu = async (req, res) => {
  const menu = await Menu.findOne({ where: { id: req.params.id } });

  if (!menu) return res.status(404).json({ msg: "Menu tidak ditemukan" });

  const { id_parent, nama_menu, link, aktif, position, urutan } = req.body;

  try {
    await Menu.update(
      { id_parent, nama_menu, link, aktif, position, urutan },
      { where: { id: menu.id } }
    );
    res.status(200).json({ msg: "Menu berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a menu by ID
export const DeleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findOne({ where: { id: req.params.id } });

    if (!menu) return res.status(404).json({ msg: "Menu tidak ditemukan" });

    await menu.destroy();
    res.status(200).json({ msg: "Menu berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

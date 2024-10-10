import Role from "../models/RoleModel.js"; // Import model Role

// Create a new role
export const CreateRole = async (req, res) => {
  const { nama_role } = req.body;

  try {
    await Role.create({ nama_role });
    res.status(201).json({ msg: "Role berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all roles
export const GetAllRoles = async (req, res) => {
  try {
    const response = await Role.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single role by ID
export const GetRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ message: "Role tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a role by ID
export const UpdateRole = async (req, res) => {
  const role = await Role.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!role) return res.status(404).json({ msg: "Role tidak ditemukan" });

  const { nama_role } = req.body;

  try {
    await Role.update({ nama_role }, { where: { id: role.id } });
    res.status(201).json({ msg: "Role berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a role by ID
export const DeleteRole = async (req, res) => {
  try {
    const role = await Role.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!role) return res.status(404).json({ msg: "Role tidak ditemukan" });

    await role.destroy();
    res.status(200).json({ msg: "Role berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

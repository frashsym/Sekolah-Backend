import UsersModul from "../models/UsersModulModel.js"; // Import model UsersModul

// Create a new users_modul
export const CreateUsersModul = async (req, res) => {
  const { id_session, id_modul } = req.body;

  try {
    await UsersModul.create({ id_session, id_modul });
    res.status(201).json({ msg: "Users Modul berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all users_modul
export const GetAllUsersModul = async (req, res) => {
  try {
    const response = await UsersModul.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single users_modul by ID
export const GetUsersModulById = async (req, res) => {
  try {
    const usersModul = await UsersModul.findByPk(req.params.id);
    if (usersModul) {
      res.status(200).json(usersModul);
    } else {
      res.status(404).json({ message: "Users Modul tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a users_modul by ID
export const UpdateUsersModul = async (req, res) => {
  const usersModul = await UsersModul.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!usersModul) return res.status(404).json({ msg: "Users Modul tidak ditemukan" });

  const { id_session, id_modul } = req.body;

  try {
    await UsersModul.update({ id_session, id_modul }, { where: { id: usersModul.id } });
    res.status(201).json({ msg: "Users Modul berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a users_modul by ID
export const DeleteUsersModul = async (req, res) => {
  try {
    const usersModul = await UsersModul.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!usersModul) return res.status(404).json({ msg: "Users Modul tidak ditemukan" });

    await usersModul.destroy();
    res.status(200).json({ msg: "Users Modul berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

import Templates from "../models/TamplatesModel.js";

export const getTemplates = async (req, res) => {
  try {
    const response = await Templates.findAll({
      attributes: ["id", "judul", "username", "pembuat", "folder", "aktif"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getTemplatesById = async (req, res) => {
  try {
    const response = await Templates.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "judul", "username", "pembuat", "folder", "aktif"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createTemplates = async (req, res) => {
  const { judul, username, pembuat, folder, aktif } = req.body;
  try {
    await Templates.create({
      judul: judul,
      username: username,
      pembuat: pembuat,
      folder: folder,
      aktif: aktif,
    });
    res.status(201).json({ msg: "Templates Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateTemplates = async (req, res) => {
  const { judul, username, pembuat, folder, aktif } = req.body;
  try {
    await Templates.update(
      {
        judul: judul,
        username: username,
        pembuat: pembuat,
        folder: folder,
        aktif: aktif,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Templates Updated Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteTemplates = async (req, res) => {
  try {
    await Templates.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Templates Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

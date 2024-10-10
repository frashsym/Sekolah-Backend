import Tag from "../models/TagModel.js"; // Import model Tag

// Create a new tag
export const CreateTag = async (req, res) => {
  const { nama_tag, username, tag_seo, count } = req.body;

  try {
    await Tag.create({ nama_tag, username, tag_seo, count });
    res.status(201).json({ msg: "Tag berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all tags
export const GetAllTags = async (req, res) => {
  try {
    const response = await Tag.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single tag by ID
export const GetTagById = async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(404).json({ message: "Tag tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a tag by ID
export const UpdateTag = async (req, res) => {
  const tag = await Tag.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!tag) return res.status(404).json({ msg: "Tag tidak ditemukan" });

  const { nama_tag, username, tag_seo, count } = req.body;

  try {
    await Tag.update({ nama_tag, username, tag_seo, count }, { where: { id: tag.id } });
    res.status(201).json({ msg: "Tag berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a tag by ID
export const DeleteTag = async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!tag) return res.status(404).json({ msg: "Tag tidak ditemukan" });

    await tag.destroy();
    res.status(200).json({ msg: "Tag berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

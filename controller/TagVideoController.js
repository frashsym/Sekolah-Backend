import TagVideo from "../models/TagVideoModel.js"; // Import model TagVideo

// Create a new tag video
export const CreateTagVideo = async (req, res) => {
  const { nama_tag, username, tag_seo, count } = req.body;

  try {
    await TagVideo.create({ nama_tag, username, tag_seo, count });
    res.status(201).json({ msg: "Tag Video berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all tag videos
export const GetAllTagVideos = async (req, res) => {
  try {
    const response = await TagVideo.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single tag video by ID
export const GetTagVideoById = async (req, res) => {
  try {
    const tagVideo = await TagVideo.findByPk(req.params.id);
    if (tagVideo) {
      res.status(200).json(tagVideo);
    } else {
      res.status(404).json({ message: "Tag Video tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a tag video by ID
export const UpdateTagVideo = async (req, res) => {
  const tagVideo = await TagVideo.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!tagVideo) return res.status(404).json({ msg: "Tag Video tidak ditemukan" });

  const { nama_tag, username, tag_seo, count } = req.body;

  try {
    await TagVideo.update({ nama_tag, username, tag_seo, count }, { where: { id: tagVideo.id } });
    res.status(201).json({ msg: "Tag Video berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a tag video by ID
export const DeleteTagVideo = async (req, res) => {
  try {
    const tagVideo = await TagVideo.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!tagVideo) return res.status(404).json({ msg: "Tag Video tidak ditemukan" });

    await tagVideo.destroy();
    res.status(200).json({ msg: "Tag Video berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

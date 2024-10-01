import Comment from "../models/CommentsModel.js";

export const getComments = async (req, res) => {
  try {
    const response = await Comment.findAll({
      attributes: [
        "id",
        "reply",
        "nama_lengkap",
        "alamat_email",
        "isi_pesan",
        "tanggal_komentar",
        "jam_komentar",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getCommentsById = async (req, res) => {
  try {
    const response = await Comment.findOne({
      where: {
        id: req.params.id,
      },
      attributes: [
        "id",
        "reply",
        "nama_lengkap",
        "alamat_email",
        "isi_pesan",
        "tanggal_komentar",
        "jam_komentar",
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createComments = async (req, res) => {
  const { reply, nama_lengkap, alamat_email, isi_pesan } = req.body;
  const tanggal_komentar = new Date().toISOString().split("T")[0];
  const jam_komentar = new Date()
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":");
  try {
    await Comment.create({
      reply: reply,
      nama_lengkap: nama_lengkap,
      alamat_email: alamat_email,
      isi_pesan: isi_pesan,
      tanggal_komentar: tanggal_komentar,
      jam_komentar: jam_komentar,
    });
    res.status(201).json({ msg: "Comment Created Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateComments = async (req, res) => {
  const { reply, nama_lengkap, alamat_email, isi_pesan } = req.body;
  const tanggal_komentar = new Date().toISOString().split("T")[0];
  const jam_komentar = new Date()
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":");
  try {
    await Comment.update(
      {
        reply,
        nama_lengkap,
        alamat_email,
        isi_pesan,
        tanggal_komentar: tanggal_komentar,
        jam_komentar: jam_komentar,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).json({ msg: "Comment Update  Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteComments = async (req, res) => {
  try {
    await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Comments Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

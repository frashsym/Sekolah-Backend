import GrafikLulusan from "../models/GrafikLulusanModel.js";
import path from "path";
import fs from "fs";

// Create a new grafik lulusan
export const CreateGrafikLulusan = async (req, res) => {
  const { id_link, jumlah, tahun, username } = req.body;

  try {
    await GrafikLulusan.create({
      id_link,
      jumlah,
      tahun,
      username,
    });
    res.status(201).json({ msg: "Grafik lulusan berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Get all grafik lulusan
export const GetAllGrafikLulusan = async (req, res) => {
  try {
    const response = await GrafikLulusan.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single grafik lulusan by ID
export const GetGrafikLulusanById = async (req, res) => {
  try {
    const grafikLulusan = await GrafikLulusan.findByPk(req.params.id);
    if (grafikLulusan) {
      res.status(200).json(grafikLulusan);
    } else {
      res.status(404).json({ message: "Grafik lulusan not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a grafik lulusan by ID
export const UpdateGrafikLulusan = async (req, res) => {
  const grafikLulusan = await GrafikLulusan.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!grafikLulusan) return res.status(404).json({ msg: "Grafik lulusan tidak ditemukan" });

  const { id_link, jumlah, tahun, username } = req.body;

  try {
    await GrafikLulusan.update(
      {
        id_link,
        jumlah,
        tahun,
        username,
      },
      {
        where: {
          id: grafikLulusan.id,
        },
      }
    );
    res.status(201).json({ msg: "Grafik lulusan berhasil diperbarui" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete a grafik lulusan by ID
export const DeleteGrafikLulusan = async (req, res) => {
  try {
    const grafikLulusan = await GrafikLulusan.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!grafikLulusan) return res.status(404).json({ msg: "Grafik lulusan tidak ditemukan" });

    await grafikLulusan.destroy();

    res.status(200).json({ msg: "Grafik lulusan berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

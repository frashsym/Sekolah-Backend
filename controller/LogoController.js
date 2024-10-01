import Logo from "../models/LogoModel.js";
import path from "path";
import fs from "fs";

// Create a new logo
export const CreateLogo = async (req, res) => {
    const { url } = req.body; // Add url_gambar field
  
    if (!req.files || !req.files.file) {
      return res.status(422).json({ msg: "Harus memasukkan gambar logo" });
    }
  
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url_gambar = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
  
    if (!allowedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Images" });
  
    if (fileSize > 5000000)
      return res.status(422).json({ msg: "Image must be less than 5 MB" });
  
    const uploadPath = `./public/images/${fileName}`;
  
    file.mv(uploadPath, async (err) => {
      if (err) return res.status(500).json({ msg: err.message });
      try {
        await Logo.create({
          gambar: fileName,
          url,
          url_gambar,
        });
        res.status(201).json({ msg: "Logo berhasil dibuat" });
      } catch (error) {
        res.status(400).json({ msg: error.message });
      }
    });
  };

// Get all logo
export const GetAllLogo = async (req, res) => {
  try {
    const response = await Logo.findAll({
      attributes: ["id", "gambar", "url"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get a single logo by ID
export const GetLogoById = async (req, res) => {
  try {
    const logo = await Logo.findByPk(req.params.id);
    if (logo) {
      res.status(200).json(logo);
    } else {
      res.status(404).json({ message: "Logo tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a logo by ID
// ... existing code ...

// Update a logo by ID
export const UpdateLogo = async (req, res) => {
    try {
      const { url_gambar } = req.body; // Add url_gambar field
  
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const allowedType = [".png", ".jpg", ".jpeg"];
  
      if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Images" });
  
      if (fileSize > 5000000)
        return res.status(422).json({ msg: "Image must be less than 5 MB" });
  
      const uploadPath = `./public/images/${fileName}`;
  
      file.mv(uploadPath, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
          const logo = await Logo.findOne({
            where: {
              id: req.params.id,
            },
          });
  
          if (!logo) return res.status(404).json({ msg: "Logo tidak ditemukan" });
  
          const filepath = `./public/images/${logo.gambar}`;
          if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
          }
  
          await Logo.update(
            {
              gambar: fileName,
              url: logo.url, // Maintain the existing url
              url_gambar, // Update url_gambar
            },
            {
              where: {
                id: logo.id,
              },
            }
          );
  
          res.status(201).json({ msg: "Logo berhasil diperbarui" });
        } catch (error) {
          res.status(400).json({ msg: error.message });
        }
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  };
  
// Delete a logo by ID
export const DeleteLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!logo) return res.status(404).json({ msg: "Logo tidak ditemukan" });

    const filepath = `./public/images/${logo.gambar}`;
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    await logo.destroy();

    res.status(200).json({ msg: "Logo berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
// Ini buat tb_comments di database
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Comments = db.define(
  "tb_comments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reply: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nama_lengkap: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 150],
      },
    },
    alamat_email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 150],
      },
    },
    isi_pesan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tanggal_komentar: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    jam_komentar: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Comments;

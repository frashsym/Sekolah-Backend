import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const HalamanStatis = db.define(
  "halaman_statis",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    judul_seo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    isi_halaman: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tgl_posting: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    url_gambar: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
    dibaca: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jam: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    hari: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20],
      },
    },
    urutan: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kelompok: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default HalamanStatis;

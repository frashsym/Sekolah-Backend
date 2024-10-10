import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Berita = db.define(
  "berita",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_kategori: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'kategori',
        key: 'id',
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    sub_judul: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    youtube: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    youtube: {
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
    headline: {
        type: DataTypes.ENUM,
        values: ["Y", "N"],
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      aktif: {
        type: DataTypes.ENUM,
        values: ["Y", "N"],
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      utama: {
        type: DataTypes.ENUM,
        values: ["Y", "N"],
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    isi_berita: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    keterangan_gambar: {
      type: DataTypes.TEXT,
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
    tanggal: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    jam: {
      type: DataTypes.TIME,
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
      dibaca: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 100],
        },
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Y", "N"],
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
  },
  
  {
    freezeTableName: true,
    indexes: [
      {
        fields: ['id_kategori'],
      },
    ],
  }
);

export default Berita;
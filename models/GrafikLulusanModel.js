import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const GrafikLulusan = db.define(
  "grafik_lulusan",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_link: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'link_terkait',
        key: 'id',
      },
    },
    jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tahun: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50],
      },
    },
  },
  {
    freezeTableName: true,
    indexes: [
      {
        fields: ['id_link'],
      },
    ],
  }
);

export default GrafikLulusan;
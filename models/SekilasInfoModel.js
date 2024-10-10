import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const SekilasInfo = db.define(
  "sekilasinfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    info: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    tgl_posting: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aktif: {
      type: DataTypes.ENUM,
      values: ["Y", "N"],
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default SekilasInfo;

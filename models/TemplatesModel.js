import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Templates = db.define(
  "templates",
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    pembuat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
      },
    },
    folder: {
      type: DataTypes.STRING,
      allowNull: false,
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

export default Templates;

import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Menu = db.define(
  "menu",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_parent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 100],
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
    position: {
        type: DataTypes.ENUM,
        values: ["Top", "Bottom"],
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
  },
  {
    freezeTableName: true,
  }
);

export default Menu;

import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const UsersModul = db.define(
  "users_modul",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_session: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 255],
      },
    },
    id_modul: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'modul',
        key: 'id',
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default UsersModul;

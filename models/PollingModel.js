import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Polling = db.define(
  "poling",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pilihan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100], // Validasi panjang karakter 1-100
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 20], // Validasi panjang karakter 1-20
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50], // Validasi panjang karakter 1-50
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true, // Validasi harus integer
      },
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

export default Polling;

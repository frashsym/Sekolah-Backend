import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Statistik = db.define(
  "statistik",
  {
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20],
      },
    },
    tanggal: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    online: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Statistik;

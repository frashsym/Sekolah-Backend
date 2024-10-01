import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    id: {
      // Mendefinisikan kolom id sebagai primary key dan auto-increment
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama_lengkap: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    no_tlp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      // Mendefinisikan kolom url tanpa validasi tambahan
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    blokir: {
      type: DataTypes.ENUM,
      values: ["Y", "N"],
      allowNull: false,
    },
    //   id_session: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //   },
  },
  {
    freezeTableName: true,
  }
);

export default Users;

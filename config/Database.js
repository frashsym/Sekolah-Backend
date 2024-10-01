import { Sequelize } from "sequelize";

const db = new Sequelize("sekolah_js", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

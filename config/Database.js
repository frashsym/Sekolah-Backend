import { Sequelize } from "sequelize";

const db = new Sequelize("db_sekolahsma", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

import { Sequelize } from "sequelize";

const db = new Sequelize("sekolahsma_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

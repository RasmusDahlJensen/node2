import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
	host: process.env.DBHOST,
	database: process.env.DBNAME,
	username: process.env.DBUSER,
	password: process.env.DBPASSWD,
	port: process.env.DBPORT,
	dialect: "mysql",
});

export default sequelize;

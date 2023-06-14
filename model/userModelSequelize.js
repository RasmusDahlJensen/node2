import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize.config.js";
import bcrypt from "bcrypt";

class UserModel extends Model {}

UserModel.init(
	{
		user_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		birthdate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "User",
		tableName: "users",
		timestamps: false,
		hooks: {
			beforeCreate: async (user, options) => {
				user.password = await createHash(user.password);
			},
		},
	}
);

const createHash = async (string) => {
	const salt = await bcrypt.genSalt(10);
	const hashedString = await bcrypt.hash(string, salt);
	return hashedString;
};

export default UserModel;

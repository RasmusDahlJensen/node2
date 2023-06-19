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
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		phone_number: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: true,
		},
		age: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		is_active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
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
			beforeUpdate: (user, options) => {
				user.updated_at = new Date();
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

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config";
import Joi from "joi";

class User extends Model {
	public id!: string;
	public name!: string;
	public email!: string;
	public password!: string;
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize: sequelize,
		tableName: "users",
	}
);
const schemaUser = Joi.object({
	name: Joi.string().min(3).max(100).optional().required().messages({
		"string.empty": "The name field cannot be empty",
		"string.min": "The name field must be at least {#limit} characters long",
		"string.max": "The name field must be no more than {#limit} characters long",
	}),
	email: Joi.string().email().required().messages({
		"string.empty": "The email field cannot be empty",
		"string.email": "The email provided is not valid",
	}),
	password: Joi.string().min(6).max(200).required().messages({
		"string.empty": "The password field cannot be empty",
		"string.min": "The password field must be at least {#limit} characters long",
		"string.max": "The password field must be no more than {#limit} characters long",
	}),
});

export { User, schemaUser };

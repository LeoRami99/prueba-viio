import { Request, Response } from "express";
import { User, schemaUser } from "../models/User.Model";
import { validatePassword, encryptPassword } from "../utils/EncryptPassword";
import jwt from "jsonwebtoken";

class AuthController {
	public signUp = async (req: Request, res: Response) => {
		try {
			const { name, email, password } = req.body;
			if (!schemaUser.validate({ name, email, password }).error) {
				return res.status(400).json({
					ok: false,
					message: schemaUser.validate({ name, email, password }).error?.details[0].message,
				});
			}

			const userExist = await User.findOne({
				where: {
					email,
				},
			});
			if (userExist) {
				return res.status(400).json({
					ok: false,
					message: "User Already Exist",
				});
			}
			const user = await User.create({
				name,
				email,
				password: (await encryptPassword(password)) as string,
			});
			if (user) {
				return res.status(201).json({
					ok: true,
					message: "User Created",
				});
			} else {
				return res.status(400).json({
					ok: false,
					message: "Error Creating User",
				});
			}
		} catch (error: any) {
			return res.status(500).json({
				error: error.message,
			});
		}
	};

	public logIn = async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;
			if (schemaUser.validate({ email, password }).error) {
				return res.status(400).json({
					ok: false,
					message: schemaUser.validate({ email, password }).error?.details[0].message,
				});
			}
			const user = await User.findOne({
				where: {
					email,
				},
			});
			if (!user) {
				return res.status(400).json({
					ok: false,
					message: "User Not Found",
				});
			}
			const validatePasswordUser = await validatePassword(password, user.password);
			if (!validatePasswordUser) {
				return res.status(400).json({
					ok: false,
					message: "Password Incorrect",
				});
			}
			const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY as string, {
				expiresIn: 60 * 60 * 24,
			});
			return res.status(200).json({
				ok: true,
				message: "Login Success",
				token,
			});
		} catch (error: any) {
			return res.status(500).json({
				ok: false,
				error: error.message,
			});
		}
	};
}
export default AuthController;

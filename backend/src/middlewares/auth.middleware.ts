// verificación de token
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const middlewareAuth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.header("Authorization")?.split(" ")[1];
	if (!token) {
		return res.status(401).json({
			ok: false,
			message: "Access Denied",
		});
	}
	try {
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
		// validar de que tenga la estructura correcta
		if (typeof decoded !== "object") {
			return res.status(400).json({
				ok: false,
				message: "Invalid Token",
			});
		}
		if (decoded.exp <= Date.now() / 1000) {
			return res.status(401).json({
				ok: false,
				message: "Token Expired",
			});
		}

		return next();
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			ok: false,
			message: "Invalid Token",
		});
	}
};
export default middlewareAuth;

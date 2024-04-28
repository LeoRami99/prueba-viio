import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/tools";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";
	const stack = err.stack;
	logger(`${message} - Stack: ${stack}`);

	res.status(statusCode).json({
		ok: false,
		message,
		...(process.env.NODE_ENV === "development" && { stack }),
	});
};

export default errorHandler;

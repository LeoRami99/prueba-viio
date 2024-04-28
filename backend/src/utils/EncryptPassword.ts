const bcrypt = require("bcryptjs");

async function encryptPassword(password: string) {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
}

async function validatePassword(password: string, passwordDB: string) {
	return await bcrypt.compare(password, passwordDB);
}

export { encryptPassword, validatePassword };

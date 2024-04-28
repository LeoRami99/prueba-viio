import fs from "fs/promises";

export async function logger(message: string) {
	const date = new Date();
	const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
	const log = `${dateString} - ${message}\n`;

	try {
		await fs.appendFile("log.txt", log);
	} catch (err) {
		console.error("Error writing log", err);
	}
}

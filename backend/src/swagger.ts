import swaggerJSDoc from "swagger-jsdoc";
const PORT = process.env.PORT;

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Express API with Swagger",
			version: "0.1.0",
			description: "This is a simple CRUD API application made with Express and documented with Swagger",
		},
		servers: [
			{
				url: `${"http://localhost"}:${PORT}/api/v1`,
			},
		],
	},
	apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };

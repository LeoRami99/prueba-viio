import axios from "axios";
import Cookie from "js-cookie";
const API_URL = process.env.API_URL as string;

export const getProducts = async () => {
	try {
		const response = await axios.get(`${API_URL}/products`, {
			headers: {
				Authorization: `Bearer ${Cookie.get("token")}`,
			},
		});
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return error.response?.data;
		} else {
			return { error: true, message: "An error occurred" };
		}
	}
};

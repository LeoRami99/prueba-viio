import axios from "axios";
const API_URL = process.env.API_URL as string;

export const login = async (email: string, password: string) => {
	try {
		const response = await axios.post(`${API_URL}/log-in`, {
			email,
			password,
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

export const signUp = async (name: string, email: string, password: string) => {
	try {
		const response = await axios.post(`${API_URL}/sign-up`, {
			name,
			email,
			password,
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

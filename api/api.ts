import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.responseType = "json";

const API = axios.create({
	baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

API.interceptors.request.use(
	async (config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

API.interceptors.response.use(
	(response) => {
		return response?.data;
	},
	(error) => {
		const status = error.response?.status ?? 401;
		if (
			status === 204 ||
			status === 205 ||
			status === 401 ||
			status === 403 ||
			status === 419
		) {
			window.location.pathname = "/login";
			Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_KEY);
		}
		return Promise.reject(error.response);
	}
);

export { API };

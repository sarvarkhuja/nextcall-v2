import { env } from "@/environments";
import { requestInterceptor } from "@/interceptors/requestInterceptor";
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: env.NEXT_PUBLIC_API_BASE_URL,
	// Example: timeout: 5000,
});

axiosInstance.interceptors.request.use(requestInterceptor, (error) =>
	Promise.reject(error)
);

export default axiosInstance;

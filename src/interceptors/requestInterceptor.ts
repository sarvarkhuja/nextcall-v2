// interceptors/requestInterceptor.ts

import { env } from "@/environments";
import type { InternalAxiosRequestConfig } from "axios";

export function requestInterceptor<T = unknown>(
	config: InternalAxiosRequestConfig<T>
): InternalAxiosRequestConfig<T> {
	// Example token from .env or local storage
	const token = env.NEXT_PUBLIC_AUTH_TOKEN;
	if (token) {
		// Use Axios 1.x headers API
		config.headers.set("Authorization", `Bearer ${token}`);
	}

	return config;
}

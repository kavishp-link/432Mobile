import axios from "axios";
import { api, handleAxiosError } from ".";

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await api.post("v1/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    const errorRes = handleAxiosError(error);
    console.error("Login API error", errorRes);
  }
};

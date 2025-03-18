import axios from "axios";
import { api, handleAxiosError } from ".";

export const signupApi = async (reqData: any) => {
  try {
    const response = await api.post("v1/auth/signup", reqData);
    console.log("signupApi respose status---->>", response.status);

    return response.data;
  } catch (error) {
    const errorRes = handleAxiosError(error);
    console.error("signupApi API error", errorRes);
  }
};

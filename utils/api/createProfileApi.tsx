import axios from "axios";
import { api, handleAxiosError } from ".";

export const createProfileApi = async (accessToken: string, reqData: any) => {
  console.log("reqData---->>", reqData);
  console.log("accessToken---->>", accessToken);

  try {
    const response = await api.post("v1/users/createProfile", reqData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("response createProfile--->>", response);
    if (response) {
      return response.data;
    }
  } catch (error) {
    const errorRes = handleAxiosError(error);
    console.error("createProfile error", errorRes);
    return errorRes?.data;
  }
};

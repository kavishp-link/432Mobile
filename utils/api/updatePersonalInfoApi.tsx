import axios from "axios";
import { api, handleAxiosError } from ".";

export const updatePersonalInfoApi = async (
  accessToken: string,
  reqData: any
) => {
  console.log("reqData---->>", reqData);
  console.log("accessToken---->>", accessToken);

  try {
    const response = await api.put("v1/users/update-profile", reqData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("response updatePersonalInfoApi--->>", response);
    if (response) {
      return response.data;
    }
  } catch (error) {
    const errorRes = handleAxiosError(error);
    console.error("updatePersonalInfoApi error", errorRes?.data);
    return errorRes?.data;
  }
};

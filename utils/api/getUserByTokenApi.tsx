import { api, handleAxiosError } from ".";

export const getUserByTokenApi = async (accessToken: string) => {
  console.log("accessToken---->>", accessToken);

  try {
    const response = await api.get("v1/users/get-user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response getUserByTokenApi--->>", response.status);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const errorRes = handleAxiosError(error);
    console.error("getUserByTokenApi error", errorRes);
    throw error;
  }
};

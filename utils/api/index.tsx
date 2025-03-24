import axios from "axios";

export * from "./loginApi";
export * from "./signupApi";
export * from "./createProfileApi";
export * from "./getUserByTokenApi";
export * from "./preSignedUrlApi";
export * from "./updatePersonalInfoApi";

export const api = axios.create({
  baseURL: "https://1c20-150-129-144-69.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response;
    } else {
      console.log("No response received from backend:", error.message);
    }
  } else {
    console.log("An unexpected error occurred:", error);
  }
  return null;
};

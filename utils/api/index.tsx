import axios from "axios";

export * from "./loginApi";
export * from "./signupApi";
export * from "./createProfileApi";
export * from "./getUserByTokenApi";

export const api = axios.create({
  baseURL:
    "https://7d45-2401-4900-8821-40d6-f916-7d6d-d3b9-67dc.ngrok-free.app",
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

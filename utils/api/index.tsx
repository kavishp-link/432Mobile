import axios from "axios";

export * from "./loginApi";
export * from "./signupApi";

export const api = axios.create({
  baseURL: "https://3020-150-129-144-69.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response; // Return the error response data from backend
    } else {
      console.log("No response received from backend:", error.message);
    }
  } else {
    console.log("An unexpected error occurred:", error);
  }
  return null;
};

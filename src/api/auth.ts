import query from "./query";

import type { LoginResponse, VerifyOtpResponse } from "./types";

export const login = async (phoneNumber: string) => {
  const response = await query.post<LoginResponse>("auth/login", {
    json: { phone_number: phoneNumber },
  });

  return response.json();
};

export const verifyOtp = async (phoneNumber: string, otp: string) => {
  const response = await query.post<VerifyOtpResponse>("auth/verify-otp", {
    json: { phone_number: phoneNumber, otp },
  });

  return response.json();
};

import query from "./query";

import type { Response, VerifyOtpResponse } from "./types";

export const login = async (phoneNumber: string) => {
  const response = await query.post<Response<null>>("auth/login", {
    json: { phone_number: phoneNumber },
  });

  return response.json();
};

export const verifyOtp = async (phoneNumber: string, otp: string) => {
  const response = await query.post<Response<VerifyOtpResponse>>(
    "auth/verify-otp",
    {
      json: { phone_number: phoneNumber, otp },
    }
  );

  return response.json();
};

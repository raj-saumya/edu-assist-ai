export type LoginResponse = {
  status: number;
};

export type VerifyOtpResponse = {
  status: number;
  message: {
    data: {
      access_token: string;
      user: {
        id: string;
        phone_number: string;
        role: string;
      };
    };
  };
};

export type StudentDashboardResponse = {
  status: number;
  message: {
    data: {
      id: string;
      phone_number: string;
      role: string;
    };
  };
};

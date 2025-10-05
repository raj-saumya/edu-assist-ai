import ky from "ky";
import progressMock from "../mock/progress.json";
import dashboardMock from "../mock/dashboard.json";
import authLoginMock from "../mock/auth-login.json";
import authVerifyOtpMock from "../mock/auth-verify-otp.json";
import profilesMock from "../mock/profiles.json";

const USE_MOCK = true;

const query = ky.create({
  prefixUrl: "http://localhost:8090/",
  credentials: "include",
  hooks: {
    beforeRequest: [
      (request) => {
        if (USE_MOCK) {
          const url = new URL(request.url);
          const pathname = url.pathname;

          if (pathname.includes("/progress")) {
            return new Response(JSON.stringify(progressMock), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (pathname.includes("/dashboard")) {
            return new Response(JSON.stringify(dashboardMock), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (pathname.includes("/auth/login")) {
            return new Response(JSON.stringify(authLoginMock), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (pathname.includes("/auth/verify-otp")) {
            return new Response(JSON.stringify(authVerifyOtpMock), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (pathname.includes("/profiles")) {
            return new Response(JSON.stringify(profilesMock), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }
        }
      },
    ],
  },
});

export default query;

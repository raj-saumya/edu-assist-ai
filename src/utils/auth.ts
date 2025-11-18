import { redirect } from "@tanstack/react-router";
import { createIsomorphicFn, createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

export const getAuthToken = (): string | null => {
  if (typeof document === "undefined") {
    return null;
  }

  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("auth-token=")
  );

  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

export const logout = () => {
  document.cookie =
    "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "profile_type=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  localStorage.clear();
  window.location.href = "/";
};

export const getCookieHeaders = createServerFn({ method: "GET" }).handler(
  async () => {
    const cookies = getRequestHeaders().get("Cookie")?.split(";") ?? [];

    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("auth-token=")
    );

    return tokenCookie ? tokenCookie.split("=")[1] : null;
  }
);

// isomorphic function to check authentication
export const isAuthenticatedFn = createIsomorphicFn()
  .server(async () => {
    const token = await getCookieHeaders();

    if (!token) {
      throw redirect({
        to: "/login",
      });
    }
  })
  .client(() => {
    const token = getAuthToken();

    if (!token) {
      throw redirect({
        to: "/login",
      });
    }
  });

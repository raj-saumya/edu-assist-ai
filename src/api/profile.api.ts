import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import query from "./query";
import type { ProfilesResponse, Response } from "./types";

export const fetchProfiles = createIsomorphicFn()
  .client(async (): Promise<ProfilesResponse | null> => {
    const response = await query.get<Response<ProfilesResponse>>("profiles");

    return response
      .json()
      .then((data) => data.message.data)
      .catch(() => null);
  })
  .server(async (): Promise<ProfilesResponse | null> => {
    const cookie = getRequestHeader("cookie");
    const response = await query.get<Response<ProfilesResponse>>("profiles", {
      headers: {
        ...(cookie && { cookie }),
      },
    });

    return response
      .json()
      .then((data) => data.message.data)
      .catch(() => null);
  });

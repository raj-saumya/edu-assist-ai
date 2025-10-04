import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import query from "./query";

import {
  Response,
  ProgressDashboardResponse,
  ParentDashboardResponse,
} from "./types";

export const fetchParticipantProgress = createIsomorphicFn()
  .client(async (): Promise<ProgressDashboardResponse | null> => {
    const response =
      await query.get<Response<ProgressDashboardResponse>>("progress");

    return response
      .json()
      .then((data) => data.message.data)
      .catch(() => null);
  })
  .server(async (): Promise<ProgressDashboardResponse | null> => {
    const cookie = getRequestHeader("cookie");
    const response = await query.get<Response<ProgressDashboardResponse>>(
      "progress",
      {
        headers: {
          ...(cookie && { cookie }),
        },
      }
    );

    return response
      .json()
      .then((data) => data.message.data)
      .catch(() => null);
  });

export const fetchParentDashboardData = createIsomorphicFn()
  .client(async (): Promise<ParentDashboardResponse | null> => {
    const response =
      await query.get<Response<ParentDashboardResponse>>("dashboard");

    return response
      .json()
      .then((data) => data.message.data)
      .catch(() => null);
  })
  .server(async (): Promise<ParentDashboardResponse | null> => {
    const cookie = getRequestHeader("cookie");
    const response = await query.get<Response<ParentDashboardResponse>>(
      "dashboard",
      {
        headers: {
          ...(cookie && { cookie }),
        },
      }
    );

    return response
      .json()
      .then((data) => data.message.data)
      .catch(() => null);
  });

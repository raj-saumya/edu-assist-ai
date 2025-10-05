import { createFileRoute, useLoaderData, redirect } from "@tanstack/react-router";
import { isAuthenticatedFn } from "~/utils/auth";
import { fetchParentDashboardData } from "~/api/dashboard.api";
import WeeklyInsights from "~/components/WeeklyInsights";
import { getProfileType } from "~/utils/profile";

export const Route = createFileRoute("/guardian")({
  component: Guardian,
  beforeLoad: async (opts) => {
    // Check authentication first
    await isAuthenticatedFn(opts);

    // Check if user is parent
    const profileType = getProfileType();
    if (profileType === "student") {
      throw redirect({ to: "/" });
    }
  },
  head: () => ({
    meta: [
      {
        title: "Edu Assist AI | Guardian",
        content: "Edu Assist AI | Track your child's progress",
      },
    ],
  }),
  loader: async () => {
    const parentDashboardData = await fetchParentDashboardData();

    return parentDashboardData;
  },
});

function Guardian() {
  const parentDashboardData = useLoaderData({ from: "/guardian" });

  if (!parentDashboardData) {
    return <div>No parent dashboard data</div>;
  }

  const { totalChildren, totalStudyHours, studyInsight, weeklyInsights } =
    parentDashboardData ?? {};

  return (
    <section className="flex flex-col px-6">
      <h2 className="text-xl font-afacad font-medium my-4">
        Monitor your children’s learning progress
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col rounded-lg p-4 bg-[#A9D1FF]">
          <img
            src="/images/icon-children.svg"
            alt="child"
            className="w-6 h-6 mb-6"
          />
          <span className="text-base font-afacad text-right">
            Active Children
          </span>
          <span className="text-5xl font-afacad font-medium text-right">
            {totalChildren}
          </span>
        </div>
        <div className="flex flex-col rounded-lg p-4 bg-[#FFE6C2]">
          <div className="flex items-center mb-6">
            <img src="/images/icon-clock.svg" alt="child" className="w-6 h-6" />
            <span className="text-xs font-afacad text-right ml-auto sm:text-base">
              {studyInsight}
            </span>
          </div>
          <span className="text-base font-afacad text-right">
            Total study hours
          </span>
          <span className="text-5xl font-afacad font-medium text-right">
            {totalStudyHours}
          </span>
        </div>
      </div>
      <span className="my-2" />
      <WeeklyInsights weeklyInsights={weeklyInsights} />
      <span className="my-6" />
    </section>
  );
}

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
    <section className="flex flex-col px-6 bg-[#0f1117] min-h-[calc(100vh-96px)]">
      <h2 className="text-xl font-heading font-medium my-4 text-white">
        Monitor your children's learning progress
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col rounded-lg p-4 bg-gradient-to-br from-primary-600/20 to-primary-700/10 border border-primary-500/20">
          <img
            src="/images/icon-children.svg"
            alt="child"
            className="w-6 h-6 mb-6 brightness-0 invert"
          />
          <span className="text-base text-right text-gray-300">
            Active Children
          </span>
          <span className="text-5xl font-heading font-medium text-right text-white">
            {totalChildren}
          </span>
        </div>
        <div className="flex flex-col rounded-lg p-4 bg-gradient-to-br from-accent-600/20 to-accent-700/10 border border-accent-500/20">
          <div className="flex items-center mb-6">
            <img src="/images/icon-clock.svg" alt="child" className="w-6 h-6 brightness-0 invert" />
            <span className="text-xs text-right ml-auto sm:text-base text-gray-300">
              {studyInsight}
            </span>
          </div>
          <span className="text-base text-right text-gray-300">
            Total study hours
          </span>
          <span className="text-5xl font-heading font-medium text-right text-white">
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

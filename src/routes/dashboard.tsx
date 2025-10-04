import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { isAuthenticatedFn } from "~/utils/auth";
import { fetchParticipantProgress } from "~/api/dashboard.api";
import StatisticsGrid from "~/components/StatisticsGrid";
import SubjectTrackCarousel from "~/components/SubjectTrackCarousel";
import ContinueHistoryCarousel from "~/components/ContinueHistoryCarousel";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  beforeLoad: isAuthenticatedFn,
  head: () => ({
    meta: [
      {
        title: "Edu Assist AI | Dashboard",
        content:
          "Edu Assist AI | Track your progress and stay on top of your studies",
      },
    ],
  }),
  loader: async () => {
    const dashboardData = await fetchParticipantProgress();

    return dashboardData;
  },
});

function Dashboard() {
  const dashboardData = useLoaderData({ from: "/dashboard" });

  if (!dashboardData) {
    return <div>No dashboard data</div>;
  }

  const { history, progress, statistics } = dashboardData ?? {};

  return (
    <section className="flex flex-col px-6">
      <h2 className="text-xl font-afacad font-medium my-4">{progress.label}</h2>
      <div className="flex flex-col p-5 bg-[#2B2A46] rounded-lg mb-6">
        <span className="text-lg font-afacad text-white mb-4">
          {progress.title}
        </span>
        <span className="text-2xl font-afacad text-white mb-6">
          {progress.callout}
        </span>
        <SubjectTrackCarousel subjects={progress.subjects} />
      </div>
      <span className="text-xl font-afacad font-medium mb-6">
        {history.label}
      </span>
      <ContinueHistoryCarousel resume={history.resume} />
      <span className="text-xl font-afacad font-medium my-6">Statistics</span>
      <StatisticsGrid metrics={statistics.metrics} />
      <span className="my-6" />
    </section>
  );
}

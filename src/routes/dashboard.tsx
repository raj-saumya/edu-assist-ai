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
    <section className="flex flex-col px-6 bg-[#0f1117] min-h-[calc(100vh-96px)]">
      <h2 className="text-xl font-heading font-medium my-4 text-white">{progress.label}</h2>
      <div className="flex flex-col p-5 bg-zinc-900 border border-zinc-800 rounded-lg mb-6">
        <span className="text-lg text-white mb-4">
          {progress.title}
        </span>
        <span className="text-2xl font-heading text-white mb-6">
          {progress.callout}
        </span>
        <SubjectTrackCarousel subjects={progress.subjects} />
      </div>
      <span className="text-xl font-heading font-medium mb-6 text-white">
        {history.label}
      </span>
      <ContinueHistoryCarousel resume={history.resume} />
      <span className="text-xl font-heading font-medium my-6 text-white">Statistics</span>
      <StatisticsGrid metrics={statistics.metrics} />
      <span className="my-6" />
    </section>
  );
}

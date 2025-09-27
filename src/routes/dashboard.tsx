import { createFileRoute } from "@tanstack/react-router";
import { isAuthenticatedFn } from "~/utils/auth";
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
});

function Dashboard() {
  return (
    <section className="flex flex-col px-6">
      <h2 className="text-xl font-afacad font-medium my-4">My Progress</h2>
      <div className="flex flex-col p-5 bg-[#2B2A46] rounded-lg mb-6">
        <span className="text-lg font-afacad text-white mb-4">Hi, Aarav!</span>
        <span className="text-2xl font-afacad text-white mb-6">
          You have completed 3 lessons this week!
        </span>
        <SubjectTrackCarousel />
      </div>
      <span className="text-xl font-afacad font-medium mb-6">
        Continue where you left off
      </span>
      <ContinueHistoryCarousel />
      <span className="text-xl font-afacad font-medium my-6">Statistics</span>
      <StatisticsGrid />
      <span className="my-6" />
    </section>
  );
}

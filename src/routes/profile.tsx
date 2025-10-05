import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { fetchProfiles } from "~/api/profile.api";
import ProfileSelection from "~/components/ProfileSelection";

export const Route = createFileRoute("/profile")({
  component: ProfileSelectionPage,
  head: () => ({
    meta: [
      {
        title: "Edu Assist AI | Select Profile",
        content: "Choose your profile to continue",
      },
    ],
  }),
  loader: async () => {
    const profiles = await fetchProfiles();

    return profiles;
  },
});

function ProfileSelectionPage() {
  const profiles = useLoaderData({ from: "/profile" });

  if (!profiles) {
    return <div>No profiles found</div>;
  }

  return <ProfileSelection profiles={profiles} />;
}

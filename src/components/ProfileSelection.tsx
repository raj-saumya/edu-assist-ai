import { useState, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { Check } from "lucide-react";

import type { ProfilesResponse } from "~/api/types";

type ProfileSelectionProps = {
  profiles: ProfilesResponse;
};

const getProfileAvatar = (profile: string) => {
  if (profile === "parent") {
    return "/images/avatar-parent.jpg";
  } else {
    return "/images/avatar-student.jpg";
  }
};

const ProfileSelection = ({ profiles }: ProfileSelectionProps) => {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const handleProfileSelect = (profile: string) => {
    setSelectedProfile(profile);
    localStorage.setItem("selectedProfile", profile);

    // Set cookie for server-side access
    document.cookie = `profile_type=${profile}; path=/; max-age=31536000`;

    if (profile === "parent") {
      router.navigate({ to: "/guardian" });
    } else {
      router.navigate({ to: "/chat" });
    }
  };

  useEffect(() => {
    const storedProfile = localStorage.getItem("selectedProfile");
    if (storedProfile) {
      setSelectedProfile(storedProfile);
    }
  }, []);

  return (
    <div className="h-[calc(100vh-96px)] w-full flex flex-col items-center justify-center p-6 bg-[#0f1117]">
      <div className="w-full">
        <p className="text-2xl text-white text-center mb-6 font-heading">
          Select profile to continue
        </p>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 mx-auto w-2/3 md:w-1/2 md:gap-14">
          {profiles.profiles.map((profile) => (
            <button
              key={profile.profile_type}
              className="relative flex items-center justify-center w-full h-full group hover:scale-105 transition-all duration-300 rounded-lg overflow-hidden border border-zinc-800"
              onClick={() => handleProfileSelect(profile.profile_type)}
            >
              <img
                src={getProfileAvatar(profile.profile_type)}
                alt={profile.profile_name}
                className="w-full h-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
              {selectedProfile === profile.profile_type && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-amber-500/20">
                  <Check className="w-10 h-10 text-amber-400" strokeWidth={3} />
                </div>
              )}
              <span className="absolute bottom-4 left-4 text-xl text-white text-center font-heading z-10">
                {profile.profile_name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSelection;

export function getProfileType(): string | null {
  if (typeof window === "undefined") return null;

  // Check localStorage first
  const stored = localStorage.getItem("selectedProfile");
  if (stored) return stored;

  // Check cookie
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "profile_type") {
      return value;
    }
  }

  return null;
}

export function isParentProfile(): boolean {
  return getProfileType() === "parent";
}

export function isStudentProfile(): boolean {
  return getProfileType() === "student";
}

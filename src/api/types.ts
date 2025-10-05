export type Response<T> = {
  status: number;
  message: {
    data: T;
  };
};

export type VerifyOtpResponse = {
  access_token: string;
  user: {
    id: string;
    phone_number: string;
    role: string;
  };
};

export type SubjectTrack = {
  subject: string;
  chapter: string;
};

export type SubjectConvoHistory = {
  subject: string;
  totalChapters?: number;
  completedChapters?: number;
};

export type Metric = {
  line1: string;
  line2: string;
};

export type ProgressDashboardResponse = {
  history: {
    label: string;
    resume: SubjectTrack[];
  };
  progress: {
    label: string;
    title: string;
    callout: string;
    subjects: SubjectConvoHistory[];
  };
  statistics: {
    metrics: Metric[];
  };
};

export type WeeklyInsight = {
  subject: string;
  name: string;
  insight: string;
};

export type ParentDashboardResponse = {
  totalChildren: number;
  totalStudyHours: number;
  studyInsight: string;
  weeklyInsights: WeeklyInsight[];
};

export type Profile = {
  profile_type: string;
  profile_name: string;
  account_created: Date;
};

export type ProfilesResponse = {
  profiles: Profile[];
};


import type { SubjectTrackCard as SubjectTrackCardType } from "~/types/dashboard.type";
import { cn } from "~/utils/merge";
import { Progress } from "~/components/ui/progress";

const COLORS = [
  "bg-gradient-to-br from-amber-400/20 to-yellow-500/10 border-amber-500/30",
  "bg-gradient-to-br from-primary-500/20 to-primary-700/10 border-primary-500/30",
  "bg-gradient-to-br from-accent-500/20 to-accent-700/10 border-accent-500/30"
];

const ICON_MAP = {
  Mathematics: "/images/icon-math.svg",
  Science: "/images/icon-chemistry.svg",
  History: "/images/icon-history.svg",
};

const SubjectTrackCard = (props: SubjectTrackCardType & { index: number }) => {
  const { subject, totalChapters, completedChapters, index } = props;

  const subjectIconSrc =
    ICON_MAP[subject as keyof typeof ICON_MAP] ?? "/images/icon-subject.svg";

  const progressPercentage =
    totalChapters && totalChapters > 0
      ? Math.round(((completedChapters ?? 0) / totalChapters) * 100)
      : 0;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg p-3 w-full h-full min-w-36 border",
        COLORS[index % COLORS.length]
      )}
    >
      <span className="text-base text-gray-400 mb-6">
        {index.toString().padStart(2, "0")}
      </span>
      <img
        src={subjectIconSrc}
        alt={subject}
        className="w-12 h-12 mb-2 mt-auto brightness-0 invert"
      />
      <span className="text-xl font-heading font-medium text-white">{subject}</span>
      {totalChapters && totalChapters > 0 ? (
        <div className="flex flex-col mt-3">
          <div className="flex items-center mb-1">
            <span className="text-base font-medium text-gray-300">
              {completedChapters?.toString().padStart(2, "0")}{" "}
              Chapters&nbsp;|&nbsp;
              {progressPercentage}%
            </span>
          </div>
          <Progress
            className="h-1"
            max={totalChapters}
            value={completedChapters}
          />
        </div>
      ) : (
        <button className="bg-gradient-to-r from-amber-400 to-yellow-500 text-sm font-bold rounded-full py-2 px-6 mt-3 text-black w-fit hover:shadow-lg hover:shadow-amber-500/30 transition-all">
          STUDY
        </button>
      )}
    </div>
  );
};

export default SubjectTrackCard;

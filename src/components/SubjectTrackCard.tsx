import type { SubjectTrackCard as SubjectTrackCardType } from "~/types/dashboard.type";
import { cn } from "~/utils/merge";
import { Progress } from "~/components/ui/progress";

const COLORS = ["#EDFA54", "#C1A9FF", "#FFE6C2"];

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
      className={cn("relative flex flex-col rounded-lg p-3 w-full h-full")}
      style={{ backgroundColor: COLORS[index % COLORS.length] }}
    >
      <span className="text-base font-afacad mb-6">
        {index.toString().padStart(2, "0")}
      </span>
      <img
        src={subjectIconSrc}
        alt={subject}
        className="w-12 h-12 mb-2 mt-auto"
      />
      <span className="text-xl font-afacad font-medium">{subject}</span>
      {totalChapters && totalChapters > 0 ? (
        <div className="flex flex-col mt-3">
          <div className="flex items-center mb-1">
            <span className="text-base font-afacad font-medium">
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
        <button className="bg-[#2B2A47] text-sm font-afacad rounded-full py-2 px-6 mt-3 text-white w-fit">
          STUDY
        </button>
      )}
    </div>
  );
};

export default SubjectTrackCard;

import { WeeklyInsight } from "~/api/types";

const WeeklyInsights = ({
  weeklyInsights,
}: {
  weeklyInsights: WeeklyInsight[];
}) => {
  return (
    <div className="flex flex-col p-5 bg-[#2B2A46] rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <img src="/images/icon-rise.svg" alt="math" className="w-6 h-6" />
        <span className="text-lg font-afacad text-white">Weekly insights</span>
        <button className="flex items-center gap-2 bg-white text-sm font-afacad rounded-full py-1 px-4 w-fit ml-auto">
          <img
            src="/images/icon-download.svg"
            alt="calendar"
            className="w-4 h-4"
          />
          <span className="text-black font-afacad text-sm">Weekly report</span>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {weeklyInsights.map(({ insight, name, subject }, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-center">
              <span className="text-lg font-afacad text-white font-medium mr-2">
                {name}
              </span>
              <span className="text-xs font-afacad text-black bg-white rounded-full px-2 py-1">
                {subject}
              </span>
            </div>
            <span className="text-base font-afacad text-white text-opacity-90">
              {insight}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyInsights;

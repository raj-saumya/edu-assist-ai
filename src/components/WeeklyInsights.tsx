import { WeeklyInsight } from "~/api/types";

const WeeklyInsights = ({
  weeklyInsights,
}: {
  weeklyInsights: WeeklyInsight[];
}) => {
  return (
    <div className="flex flex-col p-5 bg-zinc-900 border border-zinc-800 rounded-xl">
      <div className="flex items-center gap-2 mb-6">
        <img src="/images/icon-rise.svg" alt="math" className="w-6 h-6 brightness-0 invert" />
        <span className="text-lg font-heading text-white">Weekly insights</span>
        <button className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-sm font-bold rounded-full py-1 px-4 w-fit ml-auto hover:shadow-lg hover:shadow-amber-500/30 transition-all">
          <img
            src="/images/icon-download.svg"
            alt="calendar"
            className="w-4 h-4"
          />
          <span className="text-black text-sm">Weekly report</span>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {weeklyInsights.map(({ insight, name, subject }, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex items-center">
              <span className="text-lg font-heading text-white font-medium mr-2">
                {name}
              </span>
              <span className="text-xs text-black bg-gradient-to-r from-amber-400 to-yellow-500 font-medium rounded-full px-2 py-1">
                {subject}
              </span>
            </div>
            <span className="text-base text-gray-300">
              {insight}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyInsights;

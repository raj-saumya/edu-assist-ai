import type { Metric } from "~/api/types";

const StatisticsGrid = (props: { metrics: Metric[] }) => {
  const { metrics } = props;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col hover:bg-zinc-800 transition-colors">
        <div className="text-4xl font-bold font-heading text-white mb-2">
          {metrics[0].line1}
        </div>
        <div className="text-base text-gray-400">
          Total chapters studied
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col hover:bg-zinc-800 transition-colors">
        <div className="text-4xl font-bold font-heading text-white mb-2">
          {metrics[1].line1}
        </div>
        <div className="text-base text-gray-400">
          Chapters reading
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col hover:bg-zinc-800 transition-colors">
        <div className="text-4xl font-bold font-heading text-white mb-2">
          {metrics[2].line1}
        </div>
        <div className="text-base text-gray-400">
          Days of study streak
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col hover:bg-zinc-800 transition-colors">
        <div className="text-4xl font-bold font-heading text-white mb-2">
          {metrics[3].line1}
        </div>
        <div className="text-base text-gray-400">
          {metrics[3].line2}
        </div>
      </div>
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 col-span-2 flex items-center justify-center">
        <div className="w-full h-32 bg-zinc-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Chart Area</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsGrid;

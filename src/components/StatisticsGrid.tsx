const StatisticsGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div className="bg-[#f6f6f6] rounded-lg p-6 flex flex-col">
        <div className="text-4xl font-bold font-afacad text-black mb-2">17</div>
        <div className="text-base font-afacad text-gray-700">
          Total chapters studied
        </div>
      </div>
      <div className="bg-[#f6f6f6] rounded-lg p-6 flex flex-col">
        <div className="text-4xl font-bold font-afacad text-black mb-2">03</div>
        <div className="text-base font-afacad text-gray-700">
          Chapters reading
        </div>
      </div>
      <div className="bg-[#f6f6f6] rounded-lg p-6 flex flex-col">
        <div className="text-4xl font-bold font-afacad text-black mb-2">12</div>
        <div className="text-base font-afacad text-gray-700">
          Days of study streak
        </div>
      </div>
      <div className="bg-[#f6f6f6] rounded-lg p-6 flex flex-col">
        <div className="text-4xl font-bold font-afacad text-black mb-2">
          9.2
        </div>
        <div className="text-base font-afacad text-gray-700">
          hours spent this week
        </div>
      </div>
      <div className="bg-[#f6f6f6] rounded-lg p-6 col-span-2 flex items-center justify-center">
        <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500 font-afacad">Chart Area</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsGrid;

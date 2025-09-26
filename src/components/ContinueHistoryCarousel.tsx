import { useKeenSlider } from "keen-slider/react";
import CONTINUE_HISTORY from "~/mock/continueHistory.mock.json";
import ContinueHistoryCard from "./ContinueHistoryCard";

const ContinueHistoryCarousel = () => {
  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 1.75,
      spacing: 16,
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {CONTINUE_HISTORY.continueHistory.map((item, index) => (
        <div key={index} className="keen-slider__slide">
          <ContinueHistoryCard {...item} />
        </div>
      ))}
    </div>
  );
};

export default ContinueHistoryCarousel;

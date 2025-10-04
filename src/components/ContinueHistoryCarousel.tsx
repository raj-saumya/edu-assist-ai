import { useKeenSlider } from "keen-slider/react";
import ContinueHistoryCard from "./ContinueHistoryCard";

import type { SubjectTrack } from "~/api/types";

const ContinueHistoryCarousel = (props: { resume: SubjectTrack[] }) => {
  const { resume } = props;

  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 1.75,
      spacing: 16,
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {resume.map((item, index) => (
        <div key={index} className="keen-slider__slide">
          <ContinueHistoryCard {...item} />
        </div>
      ))}
    </div>
  );
};

export default ContinueHistoryCarousel;

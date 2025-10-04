import { useKeenSlider } from "keen-slider/react";
import SubjectTrackCard from "./SubjectTrackCard";

import type { SubjectConvoHistory } from "~/api/types";

const SubjectTrackCarousel = (props: { subjects: SubjectConvoHistory[] }) => {
  const { subjects } = props;

  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 2,
      spacing: 16,
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {subjects.map((subject, index) => (
        <div
          key={index}
          className="keen-slider__slide"
          style={{ minWidth: "auto", width: "auto" }}
        >
          <SubjectTrackCard {...subject} index={index} />
        </div>
      ))}
    </div>
  );
};

export default SubjectTrackCarousel;

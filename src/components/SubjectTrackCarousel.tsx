import { useKeenSlider } from "keen-slider/react";
import SubjectTrackCard from "./SubjectTrackCard";
import SUBJECT_TRACK_CARDS from "~/mock/subjectTrack.mock.json";

const SubjectTrackCarousel = () => {
  const [sliderRef] = useKeenSlider({
    mode: "free-snap",
    slides: {
      perView: 2,
      spacing: 16,
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {SUBJECT_TRACK_CARDS.subjectTrackCards.map((card, index) => (
        <div
          key={index}
          className="keen-slider__slide"
          style={{ minWidth: "auto", width: "auto" }}
        >
          <SubjectTrackCard {...card} index={index} />
        </div>
      ))}
    </div>
  );
};

export default SubjectTrackCarousel;

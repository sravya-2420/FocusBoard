
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import focusNotes from "../data/focusNotes";

function FocusNotes() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((previous) =>
      (previous + 1) % focusNotes.length
    );
  };

  const previousSlide = () => {
    setCurrentSlide((previous) =>
      (previous - 1 + focusNotes.length) % focusNotes.length
    );
  };

  const slide = focusNotes[currentSlide];

  return (
    <section className="focus-notes">
      <div className="notes-heading">
        <div>
          <p className="section-label">
            YOUR DAILY INSPIRATION
          </p>
          <h3>Focus Notes</h3>
        </div>

        <div className="carousel-buttons">
          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="notes-content">
        <p className="notes-label">{slide.label}</p>

        <h2>{slide.title}</h2>

        <p className="notes-description">
          {slide.description}
        </p>

        <div className="carousel-dots">
          {focusNotes.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={
                currentSlide === index
                  ? "dot active-dot"
                  : "dot"
              }
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={
                currentSlide === index ? "true" : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FocusNotes;

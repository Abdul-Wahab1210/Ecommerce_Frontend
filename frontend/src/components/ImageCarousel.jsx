import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel({ images = [], className = "" }) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-[4/3] bg-muted flex items-center justify-center rounded-xl">
        <span className="text-muted-foreground text-sm">No image</span>
      </div>
    );
  }

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className={`relative group ${className}`}>
      <img
        src={images[index]}
        alt="product"
        className="w-full aspect-[4/3] object-cover rounded-xl"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-background transition-all duration-200 shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-background transition-all duration-200 shadow-sm"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  );
}

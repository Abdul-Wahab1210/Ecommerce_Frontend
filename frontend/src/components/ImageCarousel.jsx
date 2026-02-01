import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel({ images = [], className = "" }) {
  const [index, setIndex] = useState(0);

  if (!images.length) {
    return (
      <div className="h-48 bg-gray-200 flex items-center justify-center rounded-lg">
        <span className="text-gray-500">No image</span>
      </div>
    );
  }

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className={`relative ${className}`}>
      <img
        src={images[index]}
        alt="product"
        className="w-full h-48 object-cover rounded-lg"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={next}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </div>
  );
}

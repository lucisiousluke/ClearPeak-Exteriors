import * as React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Photo } from "~/components/ui";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}) => {
  const [position, setPosition] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const draggingRef = React.useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  };

  React.useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.touches[0].clientX);
      }}
      className={`relative aspect-[4/3] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl shadow-lift md:aspect-[16/10] ${
        className ?? ""
      }`}
    >
      <Photo src={afterImage} alt={afterLabel} wrapperClassName="absolute inset-0 h-full w-full" />
      <span className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-800 shadow-soft">
        {afterLabel}
      </span>

      <div
        className="absolute inset-0 h-full w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Photo src={beforeImage} alt={beforeLabel} wrapperClassName="absolute inset-0 h-full w-full" />
        <span className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink-800 shadow-soft">
          {beforeLabel}
        </span>
      </div>

      <div
        className="absolute inset-y-0 z-20 w-1 -translate-x-1/2 bg-white shadow-lift"
        style={{ left: `${position}%` }}
      >
        <button
          onMouseDown={() => (draggingRef.current = true)}
          onTouchStart={() => (draggingRef.current = true)}
          aria-label="Drag to compare before and after"
          className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-gradient-brand text-on-primary shadow-glow"
        >
          <FiChevronLeft className="-mr-1" size={16} />
          <FiChevronRight className="-ml-1" size={16} />
        </button>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-x-0 bottom-3 z-30 mx-auto w-2/3 cursor-ew-resize opacity-0"
        aria-label="Before/after comparison slider"
      />
    </div>
  );
};

export default BeforeAfterSlider;

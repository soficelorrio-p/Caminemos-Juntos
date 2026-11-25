import { useEffect, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { CaneImage } from '../data/catalog';
import { SafeImage } from './SafeImage';

const ZOOM_STEPS = [1, 1.5, 2, 2.5, 3] as const;
type ZoomLevel = (typeof ZOOM_STEPS)[number];

const ZOOM_SIZE_CLASS: Record<ZoomLevel, string> = {
  1: 'w-full h-full',
  1.5: 'w-[150%] h-[150%]',
  2: 'w-[200%] h-[200%]',
  2.5: 'w-[250%] h-[250%]',
  3: 'w-[300%] h-[300%]',
};

interface ImageZoomModalProps {
  productName: string;
  images: CaneImage[];
  imageIndex: number;
  onChangeImageIndex: (index: number) => void;
  onClose: () => void;
}

export function ImageZoomModal({
  productName,
  images,
  imageIndex,
  onChangeImageIndex,
  onClose,
}: ImageZoomModalProps) {
  const [zoomIndex, setZoomIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    isDragging: false,
    hasMoved: false,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    startScrollTop: 0,
  });
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomIndexRef = useRef<number>(0);

  const zoomLevel = ZOOM_STEPS[zoomIndex];
  const totalImages = images.length;
  const currentImage = images[imageIndex] ?? images[0];

  useEffect(() => {
    setZoomIndex(0);
  }, [imageIndex]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    if (zoomLevel === 1) {
      el.scrollTo({ left: 0, top: 0 });
      return;
    }

    const frame = requestAnimationFrame(() => {
      el.scrollTo({
        left: Math.max(0, (el.scrollWidth - el.clientWidth) / 2),
        top: Math.max(0, (el.scrollHeight - el.clientHeight) / 2),
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [zoomLevel, imageIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      } else if (event.key === '+' || event.key === '=') {
        setZoomIndex((prev) => Math.min(ZOOM_STEPS.length - 1, prev + 1));
      } else if (event.key === '-' || event.key === '_') {
        setZoomIndex((prev) => Math.max(0, prev - 1));
      } else if (event.key === '0') {
        setZoomIndex(0);
      } else if (event.key === 'ArrowLeft' && totalImages > 1) {
        onChangeImageIndex((imageIndex - 1 + totalImages) % totalImages);
      } else if (event.key === 'ArrowRight' && totalImages > 1) {
        onChangeImageIndex((imageIndex + 1) % totalImages);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [imageIndex, onChangeImageIndex, onClose, totalImages]);

  const handleZoomIn = () => {
    setZoomIndex((prev) => Math.min(ZOOM_STEPS.length - 1, prev + 1));
  };

  const handleZoomOut = () => {
    setZoomIndex((prev) => Math.max(0, prev - 1));
  };

  const handleResetZoom = () => {
    setZoomIndex(0);
  };

  const handlePrevImage = () => {
    onChangeImageIndex((imageIndex - 1 + totalImages) % totalImages);
  };

  const handleNextImage = () => {
    onChangeImageIndex((imageIndex + 1) % totalImages);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (zoomLevel === 1) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    dragStateRef.current = {
      isDragging: true,
      hasMoved: false,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: el.scrollLeft,
      startScrollTop: el.scrollTop,
    };
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.isDragging) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    const dx = event.clientX - dragStateRef.current.startX;
    const dy = event.clientY - dragStateRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragStateRef.current.hasMoved = true;
    }
    el.scrollLeft = dragStateRef.current.startScrollLeft - dx;
    el.scrollTop = dragStateRef.current.startScrollTop - dy;
  };

  const handleMouseUpOrLeave = () => {
    dragStateRef.current.isDragging = false;
  };

  const handleImageClick = () => {
    if (dragStateRef.current.hasMoved) {
      dragStateRef.current.hasMoved = false;
      return;
    }
    setZoomIndex((prev) => (prev === 0 ? 2 : 0));
  };

  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.hypot(dx, dy);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      pinchStartDistRef.current = getTouchDistance(event.touches);
      pinchStartZoomIndexRef.current = zoomIndex;
    }
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2 && pinchStartDistRef.current) {
      const currentDist = getTouchDistance(event.touches);
      const ratio = currentDist / pinchStartDistRef.current;
      const stepDelta = Math.round((ratio - 1) * 2.5);
      const nextIndex = Math.min(
        ZOOM_STEPS.length - 1,
        Math.max(0, pinchStartZoomIndexRef.current + stepDelta)
      );
      if (nextIndex !== zoomIndex) {
        setZoomIndex(nextIndex);
      }
    }
  };

  const handleTouchEnd = () => {
    pinchStartDistRef.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex flex-col bg-[#0B1220]/95 text-white dark-surface"
      role="dialog"
      aria-modal="true"
      aria-label={`Vista ampliada de ${productName}: ${currentImage.label}`}
    >
      {/* Barra superior con controles de zoom y cierre */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-6 py-3 bg-[#101B30] border-b border-[#253759] shrink-0">
        <div className="min-w-0">
          <p className="text-[0.8rem] text-[#C5D1EA] truncate">{productName}</p>
          <p className="text-sm sm:text-base font-semibold text-white truncate">
            {currentImage.label}
            {totalImages > 1 ? ` (${imageIndex + 1}/${totalImages})` : ''}
          </p>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomIndex === 0}
            aria-label="Alejar imagen"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#354B75] bg-[#182744] hover:bg-[#22365E] disabled:opacity-40 disabled:pointer-events-none text-white transition-colors cursor-pointer"
          >
            <ZoomOut className="w-5 h-5" aria-hidden="true" />
          </button>

          <span className="min-w-[52px] text-center text-sm font-semibold tabular-nums text-[#E0E6F2]">
            {Math.round(zoomLevel * 100)}%
          </span>

          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomIndex === ZOOM_STEPS.length - 1}
            aria-label="Acercar imagen"
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#354B75] bg-[#182744] hover:bg-[#22365E] disabled:opacity-40 disabled:pointer-events-none text-white transition-colors cursor-pointer"
          >
            <ZoomIn className="w-5 h-5" aria-hidden="true" />
          </button>

          {zoomLevel > 1 && (
            <button
              type="button"
              onClick={handleResetZoom}
              aria-label="Restablecer zoom"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 h-10 px-3 rounded-xl border border-[#354B75] bg-[#182744] hover:bg-[#22365E] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>100%</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar imagen ampliada"
            className="inline-flex items-center justify-center gap-1.5 h-10 px-3 sm:px-4 rounded-xl bg-white text-[#16294E] hover:bg-[#EFEAE0] text-sm font-semibold transition-colors cursor-pointer ml-1"
          >
            <X className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">Cerrar</span>
          </button>
        </div>
      </div>

      {/* Área central interactiva con zoom y desplazamiento */}
      <div className="relative flex-1 min-h-0">
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`w-full h-full overflow-auto select-none ${
            zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
          }`}
        >
          <div
            onClick={handleImageClick}
            className={`${ZOOM_SIZE_CLASS[zoomLevel]} flex items-center justify-center p-3 sm:p-6 transition-all duration-200`}
          >
            <SafeImage
              src={currentImage.src}
              alt={currentImage.alt}
              fallbackTitle={productName}
              className="w-full h-full object-contain pointer-events-none select-none"
            />
          </div>
        </div>

        {totalImages > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label={`Imagen anterior de ${productName}`}
              className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#16294E] border border-[#D8D0C2] shadow-lg flex items-center justify-center cursor-pointer transition-transform active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={handleNextImage}
              aria-label={`Imagen siguiente de ${productName}`}
              className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 hover:bg-white text-[#16294E] border border-[#D8D0C2] shadow-lg flex items-center justify-center cursor-pointer transition-transform active:scale-95"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </button>
          </>
        )}
      </div>

      {/* Ayuda inferior simple */}
      <div className="px-4 py-2.5 bg-[#101B30] border-t border-[#253759] text-center text-xs sm:text-sm text-[#C5D1EA] shrink-0">
        {zoomLevel === 1
          ? 'Tocá la imagen o usá + para hacer zoom'
          : 'Deslizá con el dedo o arrastrá para recorrer el diseño · Tocá para alejar'}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  X,
  ZoomIn,
} from 'lucide-react';
import {
  buildWhatsAppUrl,
  SITE_CONFIG,
  type CaneProduct,
} from '../data/catalog';
import { ImageZoomModal } from './ImageZoomModal';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  product: CaneProduct;
  initialImageIndex?: number;
  onClose: () => void;
}

export function ProductDetailModal({
  product,
  initialImageIndex = 0,
  onClose,
}: ProductDetailModalProps) {
  const [imageIndex, setImageIndex] = useState(initialImageIndex);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  useEffect(() => {
    setImageIndex(initialImageIndex);
    setIsZoomOpen(false);
  }, [product.id, initialImageIndex]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isZoomOpen) return;
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft' && product.images.length > 1) {
        setImageIndex(
          (prev) => (prev - 1 + product.images.length) % product.images.length
        );
      } else if (event.key === 'ArrowRight' && product.images.length > 1) {
        setImageIndex((prev) => (prev + 1) % product.images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomOpen, onClose, product.images.length]);

  const totalImages = product.images.length;
  const currentImage = product.images[imageIndex] ?? product.images[0];
  const whatsappUrl = buildWhatsAppUrl(product.whatsappMessage);

  const handlePrev = () => {
    setImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    setImageIndex((prev) => (prev + 1) % totalImages);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0F1B33]/65 backdrop-blur-[2px] p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-producto-titulo"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-[#FAF8F4] border-t sm:border border-[#E2DACB] rounded-t-[2rem] sm:rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Grab handle on mobile */}
        <div className="sm:hidden pt-3 pb-1 flex justify-center shrink-0">
          <span
            aria-hidden="true"
            className="w-12 h-1.5 rounded-full bg-[#D1C8B8]"
          />
        </div>

        <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-3.5 sm:py-4 bg-[#FAF8F4] border-b border-[#E5DFD3] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 min-h-[46px] px-4 py-2 rounded-xl border border-[#CFC6B6] bg-white hover:border-[#16294E] hover:bg-[#F2F5FA] text-[#16294E] text-base font-semibold whitespace-nowrap transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Volver</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle del producto"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#CFC6B6] bg-white hover:bg-[#EFEAE0] text-[#18181B] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-7 items-start">
          <div className="lg:col-span-6 space-y-2.5">
            <div className="relative p-2 bg-white border border-[#E5DFD3] rounded-t-[2.25rem] rounded-b-2xl">
              <div className="relative h-[280px] sm:h-[340px] lg:h-[360px] w-full rounded-t-[1.75rem] rounded-b-xl overflow-hidden bg-[#F4ECE0]">
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(true)}
                  aria-label={`Ampliar imagen y hacer zoom: ${currentImage.label}`}
                  className="block w-full h-full cursor-zoom-in group relative"
                >
                  <SafeImage
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fallbackTitle={product.name}
                    className="w-full h-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                  />

                  <span className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 text-[#16294E] border border-[#D8D0C2] shadow-sm text-xs font-semibold pointer-events-none">
                    <ZoomIn className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Ampliar</span>
                  </span>
                </button>

                {totalImages > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label={`Imagen anterior de ${product.name}`}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#16294E] border border-[#D8D0C2] shadow-md flex items-center justify-center cursor-pointer transition-transform active:scale-95"
                    >
                      <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label={`Imagen siguiente de ${product.name}`}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-[#16294E] border border-[#D8D0C2] shadow-md flex items-center justify-center cursor-pointer transition-transform active:scale-95"
                    >
                      <ChevronRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {totalImages > 1 && (
              <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[#EFEAE0] rounded-xl border border-[#E2DACB]">
                <span className="text-[0.85rem] font-semibold text-[#3F3B36] truncate">
                  {currentImage.label}
                </span>
                <div className="flex items-center gap-1 shrink-0">
                  {product.images.map((img, idx) => (
                    <button
                      key={img.src}
                      type="button"
                      onClick={() => setImageIndex(idx)}
                      aria-label={`Ver foto ${idx + 1}: ${img.label}`}
                      aria-pressed={idx === imageIndex}
                      className={`min-w-[34px] min-h-[34px] px-2 rounded-lg text-[0.85rem] font-semibold tabular-nums transition-colors cursor-pointer ${
                        idx === imageIndex
                          ? 'bg-[#16294E] text-white'
                          : 'bg-white text-[#3F3B36] border border-[#D8D0C2] hover:bg-[#FAF8F4]'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <p className="text-[0.85rem] font-semibold text-[#8E3F27]">
              {product.materialLabel}
            </p>

            <h2
              id="modal-producto-titulo"
              className="font-display text-2xl sm:text-[1.65rem] font-bold text-[#18181B] mt-1 leading-snug"
            >
              {product.name}
            </h2>

            <p className="mt-2 text-2xl font-bold text-[#16294E] tabular-nums">
              {product.price}
            </p>

            <p className="mt-3 text-base text-[#18181B] leading-relaxed font-medium">
              {product.description}
            </p>

            <p className="mt-2.5 text-[0.95rem] text-[#3F3B36] leading-relaxed">
              {product.extendedDescription}
            </p>

            <dl className="mt-5 p-4 rounded-2xl bg-white border border-[#E5DFD3] grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3 text-[0.9rem]">
              <div>
                <dt className="text-[0.8rem] font-medium text-[#6B645C]">
                  Tipo de bastón
                </dt>
                <dd className="font-semibold text-[#18181B] mt-0.5">
                  {product.handleType}
                </dd>
              </div>

              <div>
                <dt className="text-[0.8rem] font-medium text-[#6B645C]">
                  Altura
                </dt>
                <dd className="font-semibold text-[#18181B] mt-0.5 tabular-nums">
                  {product.heightCm} cm · {product.fixedHeightNote}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-[0.8rem] font-medium text-[#6B645C]">
                  Diseño en vinilo
                </dt>
                <dd className="font-semibold text-[#18181B] mt-0.5">
                  {product.vinylDesign}
                </dd>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-[#EFEAE0]">
                <dt className="text-[0.8rem] font-medium text-[#6B645C]">
                  Medios de pago
                </dt>
                <dd className="font-semibold text-[#18181B] mt-0.5">
                  {SITE_CONFIG.paymentMethods}
                </dd>
              </div>
            </dl>

            <div className="hidden sm:block mt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full min-h-[50px] px-5 py-3 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-base font-semibold text-center transition-colors"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Consultar este bastón por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sticky mobile bottom CTA inside sheet */}
        <div className="sm:hidden p-3.5 bg-[#FAF8F4] border-t border-[#E5DFD3] shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 w-full min-h-[48px] px-5 py-2.5 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-[0.95rem] font-semibold text-center transition-colors"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>

      {isZoomOpen && (
        <ImageZoomModal
          productName={product.name}
          images={product.images}
          imageIndex={imageIndex}
          onChangeImageIndex={setImageIndex}
          onClose={() => setIsZoomOpen(false)}
        />
      )}
    </div>
  );
}

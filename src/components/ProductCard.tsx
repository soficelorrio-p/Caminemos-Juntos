import { useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from 'lucide-react';
import { buildWhatsAppUrl, type CaneProduct } from '../data/catalog';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: CaneProduct;
  onOpenDetail: (product: CaneProduct, activeIndex: number) => void;
}

export function ProductCard({ product, onOpenDetail }: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0);

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
    <article className="bg-white border border-[#E5DFD3] rounded-t-[2.5rem] rounded-b-2xl overflow-hidden flex flex-col shadow-[0_14px_34px_-18px_rgba(22,41,78,0.14)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_42px_-18px_rgba(22,41,78,0.2)]">
      <div className="p-3 pb-0">
        <div className="relative bg-[#F4ECE0] h-[300px] sm:h-[330px] lg:h-[340px] w-full rounded-t-[2rem] rounded-b-xl overflow-hidden">
          <button
            type="button"
            onClick={() => onOpenDetail(product, imageIndex)}
            aria-label={`Ver descripción y detalles de ${product.name}`}
            className="block w-full h-full cursor-pointer group"
          >
            <SafeImage
              src={currentImage.src}
              alt={currentImage.alt}
              fallbackTitle={product.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
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
        <div className="px-3 pt-2.5">
          <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-[#F4F0E8] rounded-xl border border-[#E7E0D3]">
            <span className="text-[0.82rem] font-semibold text-[#3F3B36] truncate">
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
                  className={`min-w-[32px] min-h-[32px] px-2 rounded-lg text-[0.82rem] font-semibold tabular-nums transition-colors cursor-pointer ${
                    idx === imageIndex
                      ? 'bg-[#16294E] text-white'
                      : 'bg-white text-[#3F3B36] border border-[#DFD6C7] hover:bg-[#FAF8F4]'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <p className="text-[0.82rem] font-semibold text-[#8E3F27]">
          {product.materialLabel}
        </p>

        <h3 className="font-display text-xl sm:text-[1.35rem] font-bold text-[#18181B] mt-1 leading-snug">
          <button
            type="button"
            onClick={() => onOpenDetail(product, imageIndex)}
            className="text-left hover:text-[#16294E] transition-colors cursor-pointer"
          >
            {product.name}
          </button>
        </h3>

        <p className="mt-1.5 text-lg font-bold text-[#16294E] tabular-nums">
          {product.price}
        </p>

        <div className="mt-auto pt-4 border-t border-[#EEE8DC] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenDetail(product, imageIndex)}
            className="inline-flex items-center justify-center gap-2 w-full min-h-[46px] px-4 py-2 rounded-xl border border-[#CFC6B6] bg-[#FAF8F4] hover:border-[#16294E] hover:bg-[#F2F5FA] text-[#16294E] text-[0.92rem] font-semibold text-center transition-colors cursor-pointer"
          >
            <span>Ver detalle</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full min-h-[46px] px-4 py-2 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-[0.92rem] font-semibold text-center transition-colors"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Consultar</span>
          </a>
        </div>
      </div>
    </article>
  );
}

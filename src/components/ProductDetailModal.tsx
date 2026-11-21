import { useEffect, useState } from 'react';
import { ArrowLeft, Eye, MessageCircle, X, ZoomIn } from 'lucide-react';
import { buildWhatsAppUrl, type CaneProduct } from '../data/catalog';
import { SafeImage } from './SafeImage';

interface ProductDetailModalProps {
  product: CaneProduct;
  initialView?: 'general' | 'detail';
  onClose: () => void;
}

export function ProductDetailModal({
  product,
  initialView = 'general',
  onClose,
}: ProductDetailModalProps) {
  const [photoView, setPhotoView] = useState<'general' | 'detail'>(initialView);

  useEffect(() => {
    setPhotoView(initialView);
  }, [product.id, initialView]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const activeImage =
    photoView === 'general' ? product.generalImage : product.detailImage;
  const activeAlt =
    photoView === 'general' ? product.generalAlt : product.detailAlt;
  const whatsappUrl = buildWhatsAppUrl(product.whatsappMessage);

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

        <div className="overflow-y-auto flex-1 p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-8 items-start">
          <div className="lg:col-span-6 space-y-3">
            <div className="p-2.5 bg-white border border-[#E5DFD3] rounded-t-[2.75rem] rounded-b-2xl">
              <div className="aspect-[4/3] w-full rounded-t-[2.25rem] rounded-b-xl overflow-hidden bg-[#F4F0E8]">
                <SafeImage
                  src={activeImage}
                  alt={activeAlt}
                  fallbackTitle={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
              className="grid grid-cols-2 gap-1.5 p-1.5 bg-[#EFEAE0] rounded-2xl border border-[#E2DACB]"
              role="group"
              aria-label={`Cambiar foto de ${product.name}`}
            >
              <button
                type="button"
                onClick={() => setPhotoView('general')}
                aria-pressed={photoView === 'general'}
                className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-3 py-2.5 rounded-xl text-[0.92rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  photoView === 'general'
                    ? 'bg-[#16294E] text-white shadow-xs'
                    : 'bg-transparent text-[#3F3B36] hover:bg-white'
                }`}
              >
                <Eye className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Foto general</span>
              </button>

              <button
                type="button"
                onClick={() => setPhotoView('detail')}
                aria-pressed={photoView === 'detail'}
                className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-3 py-2.5 rounded-xl text-[0.92rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  photoView === 'detail'
                    ? 'bg-[#16294E] text-white shadow-xs'
                    : 'bg-transparent text-[#3F3B36] hover:bg-white'
                }`}
              >
                <ZoomIn className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Detalle del vinilo</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <p className="text-[0.92rem] font-semibold text-[#8E3F27]">
              {product.collectionLabel}
            </p>

            <h2
              id="modal-producto-titulo"
              className="font-display text-3xl font-bold text-[#18181B] mt-1.5 leading-snug"
            >
              {product.name}
            </h2>

            <p className="mt-4 text-lg text-[#18181B] leading-relaxed font-medium">
              {product.description}
            </p>

            <p className="mt-3 text-base text-[#3F3B36] leading-relaxed">
              {product.extendedDescription}
            </p>

            <dl className="mt-6 p-5 rounded-2xl bg-white border border-[#E5DFD3] grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-[0.95rem]">
              <div>
                <dt className="text-[0.85rem] font-medium text-[#6B645C]">
                  Tipo de bastón
                </dt>
                <dd className="font-semibold text-[#18181B] mt-0.5">
                  {product.handleType}
                </dd>
              </div>

              <div>
                <dt className="text-[0.85rem] font-medium text-[#6B645C]">
                  Altura
                </dt>
                <dd className="font-semibold text-[#18181B] mt-0.5 tabular-nums">
                  {product.heightCm} cm · {product.fixedHeightNote}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-[0.85rem] font-medium text-[#6B645C]">
                  Diseño en vinilo
                </dt>
                <dd className="font-semibold text-[#18181B] mt-0.5">
                  {product.vinylDesign}
                </dd>
              </div>
            </dl>

            <div className="hidden sm:block mt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full min-h-[56px] px-6 py-3.5 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-lg font-semibold whitespace-nowrap transition-colors"
              >
                <MessageCircle className="w-6 h-6 shrink-0" aria-hidden="true" />
                <span>Consultar este bastón por WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sticky mobile bottom CTA inside sheet */}
        <div className="sm:hidden p-4 bg-[#FAF8F4] border-t border-[#E5DFD3] shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full min-h-[54px] px-6 py-3 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-base font-semibold whitespace-nowrap transition-colors"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

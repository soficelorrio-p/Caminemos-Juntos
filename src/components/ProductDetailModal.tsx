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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-producto-titulo"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-[#FAF8F5] border border-[#E5E0D8] rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E5E0D8]">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 min-h-[46px] px-4 py-2 rounded-xl border border-[#D4CEC3] bg-white hover:bg-[#EFEAE2] text-[#1A1918] text-base font-semibold whitespace-nowrap transition-colors"
          >
            <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Volver a los bastones</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle del producto"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#D4CEC3] bg-white hover:bg-[#EFEAE2] text-[#1A1918] transition-colors shrink-0"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-3">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#E5E0D8] bg-[#F2EFEA]">
              <SafeImage
                src={activeImage}
                alt={activeAlt}
                fallbackTitle={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="grid grid-cols-2 gap-2.5"
              role="group"
              aria-label={`Cambiar foto de ${product.name}`}
            >
              <button
                type="button"
                onClick={() => setPhotoView('general')}
                aria-pressed={photoView === 'general'}
                className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl text-[0.95rem] font-semibold whitespace-nowrap transition-colors ${
                  photoView === 'general'
                    ? 'bg-[#1A1918] text-white'
                    : 'bg-white text-[#1A1918] border border-[#D4CEC3] hover:bg-[#EFEAE2]'
                }`}
              >
                <Eye className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Foto general</span>
              </button>

              <button
                type="button"
                onClick={() => setPhotoView('detail')}
                aria-pressed={photoView === 'detail'}
                className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl text-[0.95rem] font-semibold whitespace-nowrap transition-colors ${
                  photoView === 'detail'
                    ? 'bg-[#1A1918] text-white'
                    : 'bg-white text-[#1A1918] border border-[#D4CEC3] hover:bg-[#EFEAE2]'
                }`}
              >
                <ZoomIn className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Detalle del vinilo</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <p className="text-[0.9rem] font-semibold text-[#57534E]">
              {product.collectionLabel}
            </p>

            <h2
              id="modal-producto-titulo"
              className="font-display text-3xl font-semibold text-[#1A1918] mt-1.5 leading-snug"
            >
              {product.name}
            </h2>

            <p className="mt-4 text-lg text-[#1A1918] leading-relaxed font-medium">
              {product.description}
            </p>

            <p className="mt-3 text-base text-[#3F3A36] leading-relaxed">
              {product.extendedDescription}
            </p>

            <dl className="mt-6 pt-5 border-t border-[#E5E0D8] grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-[0.95rem]">
              <div>
                <dt className="text-[0.85rem] font-medium text-[#57534E]">
                  Tipo de bastón
                </dt>
                <dd className="font-semibold text-[#1A1918] mt-0.5">
                  {product.handleType}
                </dd>
              </div>

              <div>
                <dt className="text-[0.85rem] font-medium text-[#57534E]">
                  Altura
                </dt>
                <dd className="font-semibold text-[#1A1918] mt-0.5 tabular-nums">
                  {product.heightCm} cm · {product.fixedHeightNote}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-[0.85rem] font-medium text-[#57534E]">
                  Diseño en vinilo
                </dt>
                <dd className="font-semibold text-[#1A1918] mt-0.5">
                  {product.vinylDesign}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
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
      </div>
    </div>
  );
}

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1611]/65 backdrop-blur-[2px] p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-producto-titulo"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-[#FAF6EF] border border-[#DED4C4] rounded-[1.5rem] w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#FAF6EF]/95 backdrop-blur-sm border-b border-[#E3DACB]">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 min-h-[46px] px-4 py-2 rounded-xl border border-[#D4C8B6] bg-[#FFFDF9] hover:bg-[#EFE6D8] text-[#231D18] text-base font-semibold whitespace-nowrap transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Volver a los bastones</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalle del producto"
            className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-[#D4C8B6] bg-[#FFFDF9] hover:bg-[#EFE6D8] text-[#231D18] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-3">
            <div className="p-2 bg-[#FFFDF9] border border-[#E3DACB] rounded-2xl">
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#EFE8DC]">
                <SafeImage
                  src={activeImage}
                  alt={activeAlt}
                  fallbackTitle={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div
              className="grid grid-cols-2 gap-2 p-1.5 bg-[#F1EAE0] rounded-2xl border border-[#E2D8C8]"
              role="group"
              aria-label={`Cambiar foto de ${product.name}`}
            >
              <button
                type="button"
                onClick={() => setPhotoView('general')}
                aria-pressed={photoView === 'general'}
                className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl text-[0.95rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  photoView === 'general'
                    ? 'bg-[#231D18] text-[#FAF7F2] shadow-xs'
                    : 'bg-transparent text-[#3D332B] hover:bg-[#FAF6EF]'
                }`}
              >
                <Eye className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Foto general</span>
              </button>

              <button
                type="button"
                onClick={() => setPhotoView('detail')}
                aria-pressed={photoView === 'detail'}
                className={`inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl text-[0.95rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  photoView === 'detail'
                    ? 'bg-[#231D18] text-[#FAF7F2] shadow-xs'
                    : 'bg-transparent text-[#3D332B] hover:bg-[#FAF6EF]'
                }`}
              >
                <ZoomIn className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Detalle del vinilo</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col">
            <p className="text-[0.9rem] font-semibold text-[#7A563B]">
              {product.collectionLabel}
            </p>

            <h2
              id="modal-producto-titulo"
              className="font-display text-3xl font-semibold text-[#231D18] mt-1.5 leading-snug"
            >
              {product.name}
            </h2>

            <p className="mt-4 text-lg text-[#231D18] leading-relaxed font-medium">
              {product.description}
            </p>

            <p className="mt-3 text-base text-[#4A4037] leading-relaxed">
              {product.extendedDescription}
            </p>

            <dl className="mt-6 pt-5 border-t border-[#E2D8C8] grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-[0.95rem]">
              <div>
                <dt className="text-[0.85rem] font-medium text-[#6C5E52]">
                  Tipo de bastón
                </dt>
                <dd className="font-semibold text-[#231D18] mt-0.5">
                  {product.handleType}
                </dd>
              </div>

              <div>
                <dt className="text-[0.85rem] font-medium text-[#6C5E52]">
                  Altura
                </dt>
                <dd className="font-semibold text-[#231D18] mt-0.5 tabular-nums">
                  {product.heightCm} cm · {product.fixedHeightNote}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-[0.85rem] font-medium text-[#6C5E52]">
                  Diseño en vinilo
                </dt>
                <dd className="font-semibold text-[#231D18] mt-0.5">
                  {product.vinylDesign}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full min-h-[56px] px-6 py-3.5 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-lg font-semibold whitespace-nowrap shadow-xs transition-colors"
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

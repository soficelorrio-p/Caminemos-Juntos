import { useState } from 'react';
import { ArrowRight, Eye, MessageCircle, ZoomIn } from 'lucide-react';
import { buildWhatsAppUrl, type CaneProduct } from '../data/catalog';
import { SafeImage } from './SafeImage';

interface ProductCardProps {
  product: CaneProduct;
  onOpenDetail: (product: CaneProduct, activeView: 'general' | 'detail') => void;
}

export function ProductCard({ product, onOpenDetail }: ProductCardProps) {
  const [photoView, setPhotoView] = useState<'general' | 'detail'>('general');

  const activeImage =
    photoView === 'general' ? product.generalImage : product.detailImage;
  const activeAlt =
    photoView === 'general' ? product.generalAlt : product.detailAlt;
  const whatsappUrl = buildWhatsAppUrl(product.whatsappMessage);

  return (
    <article className="bg-[#FFFDF9] border border-[#E2D9CB] rounded-[1.5rem] overflow-hidden flex flex-col shadow-[0_8px_28px_-14px_rgba(62,45,28,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-14px_rgba(62,45,28,0.18)]">
      <div className="p-3.5 pb-0">
        <button
          type="button"
          onClick={() => onOpenDetail(product, photoView)}
          aria-label={`Ver descripción y detalles de ${product.name}`}
          className="block bg-[#EFE8DC] aspect-[4/3] w-full rounded-2xl overflow-hidden text-left cursor-pointer group"
        >
          <SafeImage
            src={activeImage}
            alt={activeAlt}
            fallbackTitle={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </button>
      </div>

      <div className="px-3.5 pt-3">
        <div
          className="grid grid-cols-2 gap-2 p-1.5 bg-[#F3ECE1] rounded-2xl border border-[#E7DEC8]"
          role="group"
          aria-label={`Cambiar vista de foto para ${product.name}`}
        >
          <button
            type="button"
            onClick={() => setPhotoView('general')}
            aria-pressed={photoView === 'general'}
            className={`inline-flex items-center justify-center gap-2 min-h-[46px] px-3 py-2 rounded-xl text-[0.9rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
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
            className={`inline-flex items-center justify-center gap-2 min-h-[46px] px-3 py-2 rounded-xl text-[0.9rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
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

      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        <p className="text-[0.9rem] font-semibold text-[#7A563B]">
          {product.collectionLabel}
        </p>

        <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold text-[#231D18] mt-1 leading-snug">
          <button
            type="button"
            onClick={() => onOpenDetail(product, photoView)}
            className="text-left hover:text-[#6B4A32] transition-colors cursor-pointer"
          >
            {product.name}
          </button>
        </h3>

        <div className="mt-auto pt-6 border-t border-[#EDE5D8] flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onOpenDetail(product, photoView)}
            className="inline-flex items-center justify-center gap-2 w-full min-h-[50px] px-5 py-2.5 rounded-xl border border-[#D4C8B6] bg-[#FAF6EF] hover:bg-[#EFE6D8] text-[#231D18] text-base font-semibold whitespace-nowrap transition-colors cursor-pointer"
          >
            <span>Ver detalle</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full min-h-[54px] px-6 py-3 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-base font-semibold whitespace-nowrap shadow-xs transition-colors"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Consultar este bastón</span>
          </a>
        </div>
      </div>
    </article>
  );
}

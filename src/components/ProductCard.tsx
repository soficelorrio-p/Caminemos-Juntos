import { useState } from 'react';
import { Eye, MessageCircle, ZoomIn } from 'lucide-react';
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
    <article className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden flex flex-col transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => onOpenDetail(product, photoView)}
        aria-label={`Ver descripción y detalles de ${product.name}`}
        className="block bg-[#F2EFEA] aspect-[4/3] w-full overflow-hidden text-left cursor-pointer group"
      >
        <SafeImage
          src={activeImage}
          alt={activeAlt}
          fallbackTitle={product.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />
      </button>

      <div
        className="grid grid-cols-2 gap-2 p-3 bg-[#FAF8F5] border-b border-[#E5E0D8]"
        role="group"
        aria-label={`Cambiar vista de foto para ${product.name}`}
      >
        <button
          type="button"
          onClick={() => setPhotoView('general')}
          aria-pressed={photoView === 'general'}
          className={`inline-flex items-center justify-center gap-2 min-h-[46px] px-3 py-2 rounded-xl text-[0.9rem] font-semibold whitespace-nowrap transition-colors ${
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
          className={`inline-flex items-center justify-center gap-2 min-h-[46px] px-3 py-2 rounded-xl text-[0.9rem] font-semibold whitespace-nowrap transition-colors ${
            photoView === 'detail'
              ? 'bg-[#1A1918] text-white'
              : 'bg-white text-[#1A1918] border border-[#D4CEC3] hover:bg-[#EFEAE2]'
          }`}
        >
          <ZoomIn className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>Detalle del vinilo</span>
        </button>
      </div>

      <div className="p-6 sm:p-8 flex-1 flex flex-col">
        <p className="text-[0.88rem] font-semibold text-[#57534E]">
          {product.collectionLabel}
        </p>

        <h3 className="font-display text-2xl sm:text-[1.65rem] font-semibold text-[#1A1918] mt-1.5 leading-snug">
          <button
            type="button"
            onClick={() => onOpenDetail(product, photoView)}
            className="text-left hover:underline underline-offset-4 cursor-pointer"
          >
            {product.name}
          </button>
        </h3>

        <div className="mt-auto pt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => onOpenDetail(product, photoView)}
            className="inline-flex items-center justify-center w-full min-h-[48px] px-5 py-2.5 rounded-xl border border-[#D4CEC3] bg-[#FAF8F5] hover:bg-[#EFEAE2] text-[#1A1918] text-base font-semibold whitespace-nowrap transition-colors cursor-pointer"
          >
            Ver detalle
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full min-h-[54px] px-6 py-3 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-base font-semibold whitespace-nowrap transition-colors"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Consultar este bastón</span>
          </a>
        </div>
      </div>
    </article>
  );
}

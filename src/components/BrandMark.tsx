import { useState } from 'react';

interface BrandMarkProps {
  inverted?: boolean;
}

export function BrandMark({ inverted = false }: BrandMarkProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap shrink-0">
      {!imgError ? (
        <img
          src="/src/assets/images/logo_cj.jpg"
          alt=""
          aria-hidden="true"
          onError={() => setImgError(true)}
          className={`w-11 h-11 rounded-xl object-contain bg-white p-0.5 shrink-0 ${
            inverted ? '' : 'border border-[#E5E0D8]'
          }`}
        />
      ) : (
        <span
          aria-hidden="true"
          className={`inline-flex items-center justify-center w-11 h-11 rounded-xl font-display text-lg font-semibold shrink-0 ${
            inverted
              ? 'bg-[#FAF8F5] text-[#1A1918]'
              : 'bg-[#1A1918] text-[#FAF8F5]'
          }`}
        >
          CJ
        </span>
      )}

      <span
        className={`font-display text-[1.3rem] font-bold tracking-normal whitespace-nowrap shrink-0 ${
          inverted ? 'text-[#FAF8F4]' : 'text-[#18181B]'
        }`}
      >
        Caminemos Juntos
      </span>
    </span>
  );
}

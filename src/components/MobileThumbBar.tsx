import { Instagram, MessageCircle, Palette, Sparkles } from 'lucide-react';
import { buildWhatsAppUrl, SITE_CONFIG } from '../data/catalog';

export function MobileThumbBar() {
  const whatsappUrl = buildWhatsAppUrl(SITE_CONFIG.generalWhatsappMessage);

  return (
    <nav
      aria-label="Navegación rápida para celular"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF8F4]/95 backdrop-blur-md border-t border-[#DED6C7] shadow-[0_-8px_24px_-10px_rgba(22,41,78,0.16)]"
    >
      <div className="grid grid-cols-4 items-center gap-1.5 h-[66px] px-2">
        <a
          href="#bastones"
          className="flex flex-col items-center justify-center min-h-[50px] rounded-xl text-[#16294E] hover:bg-[#EFEAE0] transition-colors"
        >
          <Sparkles className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-semibold mt-1 leading-none">
            Bastones
          </span>
        </a>

        <a
          href="#personalizados"
          className="flex flex-col items-center justify-center min-h-[50px] rounded-xl text-[#3F3B36] hover:bg-[#EFEAE0] transition-colors"
        >
          <Palette className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-semibold mt-1 leading-none">
            A medida
          </span>
        </a>

        <a
          href={SITE_CONFIG.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[50px] rounded-xl bg-gradient-to-r from-[#7B2CBF] via-[#B82874] to-[#D62976] text-white hover:brightness-95 transition-all"
        >
          <Instagram className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-semibold mt-1 leading-none">
            Instagram
          </span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[50px] rounded-xl bg-[#15603E] text-white hover:bg-[#0F4A2F] transition-colors"
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-semibold mt-1 leading-none">
            WhatsApp
          </span>
        </a>
      </div>
    </nav>
  );
}

import { useState } from 'react';
import { Instagram, Menu, MessageCircle, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { buildWhatsAppUrl, SITE_CONFIG } from '../data/catalog';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nuestros bastones', href: '#bastones' },
  { label: 'Personalizados', href: '#personalizados' },
  { label: 'Sobre nosotros', href: '#sobre-nosotros' },
  { label: 'Contacto', href: '#contacto' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappHref = buildWhatsAppUrl(SITE_CONFIG.generalWhatsappMessage);

  return (
    <header className="relative md:sticky top-0 z-30 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-[#E5DFD3]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[64px] sm:h-[72px] flex items-center justify-between gap-3 sm:gap-6">
        <a
          href="#inicio"
          aria-label="Caminemos Juntos — Ir al inicio"
          className="rounded-lg py-1 whitespace-nowrap shrink-0"
        >
          <BrandMark />
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden xl:flex items-center gap-6"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.95rem] font-medium text-[#3F3B36] hover:text-[#16294E] hover:underline underline-offset-8 decoration-[#8E3F27] decoration-2 py-2 whitespace-nowrap shrink-0 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver Instagram de Caminemos Juntos"
            className="hidden md:inline-flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#7B2CBF] via-[#B82874] to-[#D62976] hover:brightness-95 text-white text-[0.92rem] font-semibold whitespace-nowrap shrink-0 shadow-xs transition-all"
          >
            <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Instagram</span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-[0.92rem] font-semibold whitespace-nowrap shrink-0 shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-movil"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            className="xl:hidden inline-flex items-center justify-center gap-1.5 min-h-[42px] px-3 rounded-xl border border-[#D8D0C2] bg-white text-[#18181B] font-semibold text-[0.9rem] whitespace-nowrap shrink-0 hover:bg-[#F3EFE6] transition-colors"
          >
            {mobileMenuOpen ? (
              <>
                <X className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Cerrar</span>
              </>
            ) : (
              <>
                <Menu className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Menú</span>
              </>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          id="menu-movil"
          aria-label="Menú móvil"
          className="xl:hidden border-t border-[#E5DFD3] bg-[#FAF8F4] px-4 sm:px-6 py-4"
        >
          <ul className="flex flex-col gap-1.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center min-h-[48px] px-4 rounded-xl text-base font-medium text-[#18181B] hover:bg-[#EFEAE0] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-[#E5DFD3] flex flex-col gap-3">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2.5 w-full min-h-[48px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7B2CBF] via-[#B82874] to-[#D62976] hover:brightness-95 text-white text-base font-semibold text-center transition-all"
            >
              <Instagram className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Ver Instagram</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2.5 w-full min-h-[48px] px-5 py-2.5 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-base font-semibold text-center transition-colors"
            >
              <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

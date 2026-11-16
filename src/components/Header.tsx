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
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#E5E0D8]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-6">
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
              className="text-[0.95rem] font-medium text-[#3F3A36] hover:text-[#1A1918] hover:underline underline-offset-8 decoration-2 py-2 whitespace-nowrap shrink-0 transition-colors"
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
            className="hidden md:inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#7B2CBF] via-[#B82874] to-[#D62976] hover:brightness-95 text-white text-[0.95rem] font-semibold whitespace-nowrap shrink-0 transition-all"
          >
            <Instagram className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>Instagram</span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-[0.95rem] font-semibold whitespace-nowrap shrink-0 transition-colors"
          >
            <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span>WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-movil"
            className="xl:hidden inline-flex items-center justify-center gap-2 min-h-[48px] px-4 rounded-xl border border-[#D4CEC3] bg-white text-[#1A1918] font-semibold text-base whitespace-nowrap shrink-0 hover:bg-[#F2EFEA] transition-colors"
          >
            {mobileMenuOpen ? (
              <>
                <X className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Cerrar</span>
              </>
            ) : (
              <>
                <Menu className="w-5 h-5 shrink-0" aria-hidden="true" />
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
          className="xl:hidden border-t border-[#E5E0D8] bg-[#FAF8F5] px-4 sm:px-6 py-4"
        >
          <ul className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center min-h-[52px] px-4 rounded-xl text-lg font-medium text-[#1A1918] hover:bg-[#EFEAE2] transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-[#E5E0D8] flex flex-col gap-3">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-3 w-full min-h-[54px] px-6 rounded-xl bg-gradient-to-r from-[#7B2CBF] via-[#B82874] to-[#D62976] hover:brightness-95 text-white text-lg font-semibold transition-all"
            >
              <Instagram className="w-6 h-6 shrink-0" aria-hidden="true" />
              <span>Ver Instagram</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-3 w-full min-h-[54px] px-6 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-lg font-semibold transition-colors"
            >
              <MessageCircle className="w-6 h-6 shrink-0" aria-hidden="true" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

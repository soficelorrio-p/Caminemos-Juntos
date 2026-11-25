import { useState } from 'react';
import {
  ArrowDown,
  Banknote,
  Instagram,
  MessageCircle,
  Palette,
  Phone,
} from 'lucide-react';
import { BrandMark } from './components/BrandMark';
import { Header } from './components/Header';
import { MobileThumbBar } from './components/MobileThumbBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SafeImage } from './components/SafeImage';
import {
  ABOUT_CONTENT,
  buildWhatsAppUrl,
  CONTACT_CONTENT,
  CUSTOM_CONTENT,
  HERO_CONTENT,
  HOW_IT_WORKS_STEPS,
  PRODUCTS,
  SITE_CONFIG,
  type CaneProduct,
} from './data/catalog';

export default function App() {
  const [selectedDetail, setSelectedDetail] = useState<{
    product: CaneProduct;
    activeIndex: number;
  } | null>(null);

  const generalWhatsappUrl = buildWhatsAppUrl(
    SITE_CONFIG.generalWhatsappMessage
  );
  const customWhatsappUrl = buildWhatsAppUrl(SITE_CONFIG.customWhatsappMessage);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#18181B]">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-5 focus:py-3 focus:rounded-xl focus:bg-[#16294E] focus:text-white focus:font-semibold"
      >
        Ir al contenido principal
      </a>

      <Header />

      <main id="contenido-principal" className="flex-1">
        {/* PORTADA / HERO — DISEÑO EDITORIAL TIPO ARCO DE GALERÍA */}
        <section
          id="inicio"
          aria-labelledby="hero-titulo"
          className="pt-6 pb-14 sm:pt-12 sm:pb-24 border-b border-[#E5DFD3] bg-atelier-canvas overflow-hidden"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Foto protagonista en arco escultural (primero en celular para impacto inmediato) */}
              <div className="lg:col-span-6 lg:order-2">
                <div className="relative mx-auto max-w-[460px] lg:max-w-none">
                  <div className="p-2.5 sm:p-3.5 rounded-t-[10rem] sm:rounded-t-[13rem] rounded-b-[2rem] bg-white border border-[#E2DACB] shadow-[0_24px_56px_-22px_rgba(22,41,78,0.2)]">
                    <div className="aspect-[4/3] sm:aspect-[5/4] w-full rounded-t-[9rem] sm:rounded-t-[12rem] rounded-b-[1.5rem] overflow-hidden bg-[#F4F0E8]">
                      <SafeImage
                        src={HERO_CONTENT.heroImage}
                        alt={HERO_CONTENT.heroImageAlt}
                        fallbackTitle="Caminemos Juntos — Bastones con arte"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloque tipográfico principal */}
              <div className="lg:col-span-6 lg:order-1 flex flex-col justify-center">
                <h1
                  id="hero-titulo"
                  className="font-display text-[1.8rem] sm:text-[2.35rem] lg:text-[2.75rem] font-bold tracking-tight text-[#18181B] leading-[1.14]"
                >
                  Un bastón que te acompaña{' '}
                  <span className="text-[#8E3F27]">y te representa</span>
                </h1>

                <p className="mt-4 text-base sm:text-[1.06rem] text-[#3F3B36] leading-relaxed max-w-xl">
                  {HERO_CONTENT.subtitle}
                </p>

                <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
                  <a
                    href="#bastones"
                    className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-2xl bg-[#16294E] hover:bg-[#0F1D38] text-white text-[0.95rem] font-semibold text-center shadow-sm transition-colors"
                  >
                    <span>{HERO_CONTENT.primaryCta}</span>
                    <ArrowDown className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>

                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-2xl border-2 border-[#15603E] bg-white hover:bg-[#EDF7F2] text-[#114D31] text-[0.95rem] font-semibold text-center transition-colors"
                  >
                    <MessageCircle
                      className="w-4 h-4 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{HERO_CONTENT.secondaryCta}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NUESTROS BASTONES — CATÁLOGO CON TARJETAS EN ARCO */}
        <section
          id="bastones"
          aria-labelledby="bastones-titulo"
          className="py-12 sm:py-20 bg-atelier-canvas"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2
                id="bastones-titulo"
                className="font-display text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight"
              >
                Nuestros bastones
              </h2>
              <p className="mt-1.5 text-base sm:text-[1.05rem] text-[#3F3B36] leading-relaxed">
                Bastones de altura fija con mango de madera y diseños en vinilo.
              </p>
            </div>

            <div
              className={
                PRODUCTS.length === 1
                  ? 'mt-8 max-w-[360px] sm:max-w-[380px] mx-auto'
                  : PRODUCTS.length === 2
                    ? 'mt-8 max-w-[800px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8'
                    : 'mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7'
              }
            >
              {PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetail={(clickedProduct, activeIndex) =>
                    setSelectedDetail({
                      product: clickedProduct,
                      activeIndex,
                    })
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* PERSONALIZADOS — COMPOSICIÓN SUPERPUESTA DE ATELIER */}
        <section
          id="personalizados"
          aria-labelledby="personalizados-titulo"
          className="py-14 sm:py-24 bg-atelier-prussian text-white dark-surface"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-10 xl:gap-12 items-center">
              <div className="lg:col-span-6 lg:order-2">
                <div className="p-2.5 sm:p-3 rounded-t-[6rem] sm:rounded-t-[9rem] rounded-b-3xl bg-white shadow-2xl">
                  <div className="aspect-[4/3] rounded-t-[5.25rem] sm:rounded-t-[8rem] rounded-b-2xl overflow-hidden bg-[#F4F0E8]">
                    <SafeImage
                      src={CUSTOM_CONTENT.studioImage}
                      alt={CUSTOM_CONTENT.studioImageAlt}
                      fallbackTitle="Vinilos artísticos personalizados"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 lg:order-1 -mt-8 mx-2 sm:mx-6 lg:mx-0 lg:mt-0 relative z-10 bg-[#FAF8F4] text-[#18181B] border border-[#E2DACB] rounded-3xl p-5 sm:p-8 shadow-2xl">
                <div className="inline-flex items-center gap-2 text-[#8E3F27] text-[0.88rem] font-semibold">
                  <Palette className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>A consulta</span>
                </div>

                <h2
                  id="personalizados-titulo"
                  className="font-display text-2xl sm:text-3xl font-bold text-[#18181B] mt-2 tracking-tight"
                >
                  {CUSTOM_CONTENT.title}
                </h2>

                <p className="mt-3 text-base sm:text-[1.02rem] text-[#3F3B36] leading-relaxed">
                  {CUSTOM_CONTENT.description}
                </p>

                <div className="mt-6">
                  <a
                    href={customWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-5 py-3 rounded-2xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-[0.95rem] sm:text-base font-semibold shadow-sm transition-colors w-full text-center"
                  >
                    <MessageCircle
                      className="w-5 h-5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{CUSTOM_CONTENT.ctaLabel}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE NOSOTROS — RETRATO EN ARCO + HISTORIA LIMPIA */}
        <section
          id="sobre-nosotros"
          aria-labelledby="sobre-titulo"
          className="py-12 sm:py-20 bg-atelier-canvas"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6">
                <div className="p-2.5 sm:p-3 rounded-t-[8rem] sm:rounded-t-[11rem] rounded-b-[2rem] bg-white border border-[#E2DACB] shadow-[0_20px_50px_-24px_rgba(22,41,78,0.16)]">
                  <div className="aspect-[4/3] rounded-t-[7.25rem] sm:rounded-t-[10rem] rounded-b-[1.5rem] overflow-hidden bg-[#F4F0E8]">
                    <SafeImage
                      src={ABOUT_CONTENT.image}
                      alt={ABOUT_CONTENT.imageAlt}
                      fallbackTitle="Taller Caminemos Juntos"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <h2
                  id="sobre-titulo"
                  className="font-display text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight"
                >
                  {ABOUT_CONTENT.title}
                </h2>

                <p className="mt-4 font-sans text-base sm:text-[1.05rem] text-[#3F3B36] leading-relaxed">
                  {ABOUT_CONTENT.leadParagraph}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA — ÍNDICE EDITORIAL SIN CAJAS GENÉRICAS */}
        <section
          aria-labelledby="pasos-titulo"
          className="py-12 sm:py-20 bg-atelier-stone border-t border-[#E5DFD3]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="pasos-titulo"
              className="font-display text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight"
            >
              Cómo funciona
            </h2>

            <ol className="mt-7 sm:mt-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D9CFBE] bg-white/75 backdrop-blur-xs border border-[#E2DACB] rounded-3xl overflow-hidden">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <li
                  key={step.number}
                  className="p-6 sm:p-8 flex flex-row md:flex-col items-start gap-4"
                >
                  <span className="font-display text-3xl sm:text-4xl font-bold text-[#8E3F27] tabular-nums leading-none shrink-0">
                    0{step.number}
                  </span>

                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#18181B] leading-snug">
                      {step.title}
                    </h3>

                    <p className="mt-1.5 text-[0.95rem] text-[#3F3B36] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACTO */}
        <section
          id="contacto"
          aria-labelledby="contacto-titulo"
          className="pt-14 pb-14 sm:py-20 bg-atelier-prussian text-[#FAF8F4] rounded-t-[2.25rem] sm:rounded-t-[3.5rem] -mt-4 relative z-10 dark-surface"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <h2
                  id="contacto-titulo"
                  className="font-display text-2xl sm:text-3xl font-bold text-[#FAF8F4] leading-tight"
                >
                  {CONTACT_CONTENT.title}
                </h2>

                <p className="mt-3 text-base sm:text-[1.05rem] text-[#E0E6F2] leading-relaxed max-w-2xl">
                  {CONTACT_CONTENT.subtitle}
                </p>

                <div className="mt-6 sm:mt-7">
                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-7 py-3.5 rounded-2xl bg-[#1D8354] hover:bg-[#15603E] text-white text-base font-semibold text-center shadow-md transition-colors w-full sm:w-auto"
                  >
                    <MessageCircle
                      className="w-5 h-5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{CONTACT_CONTENT.whatsappCta}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#203866] border border-[#355188] rounded-3xl p-5 sm:p-7 space-y-4">
                <div>
                  <p className="text-[0.85rem] font-medium text-[#C5D1EA]">
                    Teléfono
                  </p>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="mt-1 inline-flex items-center gap-2.5 text-lg font-semibold text-[#FAF8F4] hover:underline underline-offset-4 tabular-nums min-h-[44px]"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{SITE_CONFIG.phoneDisplay}</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-[#355188]">
                  <p className="text-[0.85rem] font-medium text-[#C5D1EA]">
                    Instagram
                  </p>
                  <a
                    href={SITE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-2.5 text-[0.95rem] sm:text-base font-semibold text-[#FAF8F4] hover:underline underline-offset-4 break-all min-h-[44px]"
                  >
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shrink-0 shadow-xs"
                      aria-hidden="true"
                    >
                      <Instagram className="w-4 h-4" />
                    </span>
                    <span>@{SITE_CONFIG.instagramHandle}</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-[#355188]">
                  <p className="text-[0.85rem] font-medium text-[#C5D1EA]">
                    Medios de pago
                  </p>
                  <p className="mt-1.5 inline-flex items-center gap-2.5 text-base font-semibold text-[#FAF8F4]">
                    <Banknote
                      className="w-5 h-5 text-[#A7E3C4] shrink-0"
                      aria-hidden="true"
                    />
                    <span>{SITE_CONFIG.paymentMethods}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0F1D38] text-[#D4DDF0] border-t border-[#263E6C] pt-10 pb-24 md:pb-10 dark-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <BrandMark inverted />

          <nav
            aria-label="Enlaces del pie de página"
            className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]"
          >
            <a
              href="#inicio"
              className="hover:text-white hover:underline underline-offset-4 py-1"
            >
              Inicio
            </a>
            <a
              href="#bastones"
              className="hover:text-white hover:underline underline-offset-4 py-1"
            >
              Nuestros bastones
            </a>
            <a
              href="#personalizados"
              className="hover:text-white hover:underline underline-offset-4 py-1"
            >
              Personalizados
            </a>
            <a
              href="#sobre-nosotros"
              className="hover:text-white hover:underline underline-offset-4 py-1"
            >
              Sobre nosotros
            </a>
            <a
              href="#contacto"
              className="hover:text-white hover:underline underline-offset-4 py-1"
            >
              Contacto
            </a>
          </nav>

          <p className="text-sm text-[#B2C0DD]">
            © {new Date().getFullYear()} Caminemos Juntos (CJ)
          </p>
        </div>
      </footer>

      <MobileThumbBar />

      {selectedDetail && (
        <ProductDetailModal
          product={selectedDetail.product}
          initialImageIndex={selectedDetail.activeIndex}
          onClose={() => setSelectedDetail(null)}
        />
      )}
    </div>
  );
}

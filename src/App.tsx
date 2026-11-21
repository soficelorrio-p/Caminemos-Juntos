import { useState } from 'react';
import {
  ArrowDown,
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
  type CaneCollectionId,
  type CaneProduct,
} from './data/catalog';

type CollectionFilter = 'all' | CaneCollectionId;

export default function App() {
  const [collectionFilter, setCollectionFilter] =
    useState<CollectionFilter>('all');
  const [selectedDetail, setSelectedDetail] = useState<{
    product: CaneProduct;
    activeView: 'general' | 'detail';
  } | null>(null);

  const filteredProducts =
    collectionFilter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((item) => item.collection === collectionFilter);

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
                  className="font-display text-[2.15rem] sm:text-[2.95rem] lg:text-[3.35rem] font-bold tracking-tight text-[#18181B] leading-[1.12]"
                >
                  Un bastón que te acompaña{' '}
                  <span className="text-[#8E3F27]">y te representa</span>
                </h1>

                <p className="mt-4 sm:mt-5 text-lg sm:text-[1.2rem] text-[#3F3B36] leading-relaxed max-w-xl">
                  {HERO_CONTENT.subtitle}
                </p>

                <div className="mt-7 sm:mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 sm:gap-4">
                  <a
                    href="#bastones"
                    className="inline-flex items-center justify-center gap-3 min-h-[54px] px-7 py-3.5 rounded-2xl bg-[#16294E] hover:bg-[#0F1D38] text-white text-base font-semibold whitespace-nowrap shadow-sm transition-colors"
                  >
                    <span>{HERO_CONTENT.primaryCta}</span>
                    <ArrowDown className="w-5 h-5 shrink-0" aria-hidden="true" />
                  </a>

                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 min-h-[54px] px-7 py-3.5 rounded-2xl border-2 border-[#15603E] bg-white hover:bg-[#EDF7F2] text-[#114D31] text-base font-semibold whitespace-nowrap transition-colors"
                  >
                    <MessageCircle
                      className="w-5 h-5 shrink-0"
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
          className="py-14 sm:py-24 bg-atelier-canvas"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-2xl">
                <h2
                  id="bastones-titulo"
                  className="font-display text-3xl sm:text-4xl font-bold text-[#18181B] tracking-tight"
                >
                  Nuestros bastones
                </h2>
                <p className="mt-2 text-lg text-[#3F3B36] leading-relaxed">
                  Bastones de altura fija con diseños exclusivos en vinilo.
                </p>
              </div>

              <div
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFEAE0] border border-[#E2DACB] rounded-2xl self-start w-full sm:w-auto"
                role="group"
                aria-label="Filtrar modelos por colección"
              >
                <button
                  type="button"
                  onClick={() => setCollectionFilter('all')}
                  aria-pressed={collectionFilter === 'all'}
                  className={`flex-1 sm:flex-none min-h-[46px] px-4 py-2 rounded-xl text-[0.92rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    collectionFilter === 'all'
                      ? 'bg-[#16294E] text-white shadow-xs'
                      : 'bg-transparent text-[#3F3B36] hover:bg-white'
                  }`}
                >
                  Todos
                </button>

                <button
                  type="button"
                  onClick={() => setCollectionFilter('primera')}
                  aria-pressed={collectionFilter === 'primera'}
                  className={`flex-1 sm:flex-none min-h-[46px] px-4 py-2 rounded-xl text-[0.92rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    collectionFilter === 'primera'
                      ? 'bg-[#16294E] text-white shadow-xs'
                      : 'bg-transparent text-[#3F3B36] hover:bg-white'
                  }`}
                >
                  Primera colección
                </button>

                <button
                  type="button"
                  onClick={() => setCollectionFilter('madera')}
                  aria-pressed={collectionFilter === 'madera'}
                  className={`flex-1 sm:flex-none min-h-[46px] px-4 py-2 rounded-xl text-[0.92rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    collectionFilter === 'madera'
                      ? 'bg-[#16294E] text-white shadow-xs'
                      : 'bg-transparent text-[#3F3B36] hover:bg-white'
                  }`}
                >
                  Mango de madera
                </button>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenDetail={(clickedProduct, activeView) =>
                    setSelectedDetail({ product: clickedProduct, activeView })
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

              <div className="lg:col-span-6 lg:order-1 -mt-8 mx-2 sm:mx-6 lg:mx-0 lg:mt-0 relative z-10 bg-[#FAF8F4] text-[#18181B] border border-[#E2DACB] rounded-3xl p-6 sm:p-10 shadow-2xl">
                <div className="inline-flex items-center gap-2.5 text-[#8E3F27] text-[0.95rem] font-semibold">
                  <Palette className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>A consulta</span>
                </div>

                <h2
                  id="personalizados-titulo"
                  className="font-display text-3xl sm:text-4xl font-bold text-[#18181B] mt-2.5 tracking-tight"
                >
                  {CUSTOM_CONTENT.title}
                </h2>

                <p className="mt-4 text-lg text-[#3F3B36] leading-relaxed">
                  {CUSTOM_CONTENT.description}
                </p>

                <div className="mt-7">
                  <a
                    href={customWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 min-h-[54px] px-6 py-3.5 rounded-2xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-base sm:text-lg font-semibold shadow-sm transition-colors w-full text-center"
                  >
                    <MessageCircle
                      className="w-6 h-6 shrink-0"
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
          className="py-14 sm:py-24 bg-atelier-canvas"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
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
                  className="font-display text-3xl sm:text-4xl font-bold text-[#18181B] tracking-tight"
                >
                  {ABOUT_CONTENT.title}
                </h2>

                <p className="mt-5 font-sans text-lg sm:text-[1.15rem] text-[#3F3B36] leading-relaxed">
                  {ABOUT_CONTENT.leadParagraph}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA — ÍNDICE EDITORIAL SIN CAJAS GENÉRICAS */}
        <section
          aria-labelledby="pasos-titulo"
          className="py-14 sm:py-24 bg-atelier-stone border-t border-[#E5DFD3]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="pasos-titulo"
              className="font-display text-3xl sm:text-4xl font-bold text-[#18181B] tracking-tight"
            >
              Cómo funciona
            </h2>

            <ol className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#D9CFBE] bg-white/75 backdrop-blur-xs border border-[#E2DACB] rounded-3xl overflow-hidden">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <li
                  key={step.number}
                  className="p-7 sm:p-9 flex flex-row md:flex-col items-start gap-5 md:gap-4"
                >
                  <span className="font-display text-4xl sm:text-5xl font-bold text-[#8E3F27] tabular-nums leading-none shrink-0">
                    0{step.number}
                  </span>

                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-[#18181B] leading-snug">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-base text-[#3F3B36] leading-relaxed">
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
          className="pt-16 pb-16 sm:py-24 bg-atelier-prussian text-[#FAF8F4] rounded-t-[2.25rem] sm:rounded-t-[3.5rem] -mt-4 relative z-10 dark-surface"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7">
                <h2
                  id="contacto-titulo"
                  className="font-display text-3xl sm:text-4xl font-bold text-[#FAF8F4] leading-tight"
                >
                  {CONTACT_CONTENT.title}
                </h2>

                <p className="mt-4 text-lg text-[#E0E6F2] leading-relaxed max-w-2xl">
                  {CONTACT_CONTENT.subtitle}
                </p>

                <div className="mt-8">
                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 min-h-[60px] px-8 py-4 rounded-2xl bg-[#1D8354] hover:bg-[#15603E] text-white text-lg font-semibold whitespace-nowrap shadow-md transition-colors w-full sm:w-auto"
                  >
                    <MessageCircle
                      className="w-6 h-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{CONTACT_CONTENT.whatsappCta}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#203866] border border-[#355188] rounded-3xl p-6 sm:p-8 space-y-5">
                <div>
                  <p className="text-sm font-medium text-[#C5D1EA]">Teléfono</p>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="mt-1 inline-flex items-center gap-3 text-xl font-semibold text-[#FAF8F4] hover:underline underline-offset-4 tabular-nums min-h-[48px]"
                  >
                    <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>{SITE_CONFIG.phoneDisplay}</span>
                  </a>
                </div>

                <div className="pt-5 border-t border-[#355188]">
                  <p className="text-sm font-medium text-[#C5D1EA]">
                    Instagram
                  </p>
                  <a
                    href={SITE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-3 text-lg font-semibold text-[#FAF8F4] hover:underline underline-offset-4 break-all min-h-[48px]"
                  >
                    <span
                      className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shrink-0 shadow-xs"
                      aria-hidden="true"
                    >
                      <Instagram className="w-5 h-5" />
                    </span>
                    <span>@{SITE_CONFIG.instagramHandle}</span>
                  </a>
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
          initialView={selectedDetail.activeView}
          onClose={() => setSelectedDetail(null)}
        />
      )}
    </div>
  );
}

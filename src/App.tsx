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
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1918]">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-5 focus:py-3 focus:rounded-xl focus:bg-[#1A1918] focus:text-white focus:font-semibold"
      >
        Ir al contenido principal
      </a>

      <Header />

      <main id="contenido-principal" className="flex-1">
        {/* PORTADA / HERO */}
        <section
          id="inicio"
          aria-labelledby="hero-titulo"
          className="pt-10 pb-14 sm:pt-14 sm:pb-20 border-b border-[#E5E0D8]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <h1
                  id="hero-titulo"
                  className="font-display text-[2.2rem] sm:text-[2.85rem] lg:text-[3.25rem] font-semibold tracking-tight text-[#1A1918] leading-[1.14]"
                >
                  {HERO_CONTENT.title}
                </h1>

                <p className="mt-5 text-lg sm:text-[1.2rem] text-[#3F3A36] leading-relaxed max-w-xl">
                  {HERO_CONTENT.subtitle}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4">
                  <a
                    href="#bastones"
                    className="inline-flex items-center justify-center gap-3 min-h-[54px] px-7 py-3.5 rounded-xl bg-[#1A1918] hover:bg-[#312E2B] text-white text-base font-semibold whitespace-nowrap transition-colors"
                  >
                    <span>{HERO_CONTENT.primaryCta}</span>
                    <ArrowDown className="w-5 h-5 shrink-0" aria-hidden="true" />
                  </a>

                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 min-h-[54px] px-7 py-3.5 rounded-xl border-2 border-[#15603E] bg-white hover:bg-[#EDF7F2] text-[#114D31] text-base font-semibold whitespace-nowrap transition-colors"
                  >
                    <MessageCircle
                      className="w-5 h-5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{HERO_CONTENT.secondaryCta}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="h-full min-h-[280px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-[#E5E0D8] bg-[#EFEAE2]">
                  <SafeImage
                    src={HERO_CONTENT.heroImage}
                    alt={HERO_CONTENT.heroImageAlt}
                    fallbackTitle="Caminemos Juntos — Bastones con diseño"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NUESTROS BASTONES */}
        <section
          id="bastones"
          aria-labelledby="bastones-titulo"
          className="py-16 sm:py-20"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2
                id="bastones-titulo"
                className="font-display text-3xl sm:text-4xl font-semibold text-[#1A1918] tracking-tight"
              >
                Nuestros bastones
              </h2>
              <p className="mt-3 text-lg text-[#3F3A36] leading-relaxed">
                Cada bastón está intervenido con vinilo impreso de alta calidad.
                Todos nuestros modelos son de{' '}
                <strong className="font-semibold text-[#1A1918]">
                  altura fija (no regulables)
                </strong>{' '}
                para mayor firmeza. Tocá{' '}
                <strong className="font-semibold text-[#1A1918]">
                  Detalle del vinilo
                </strong>{' '}
                en cualquier tarjeta para ver el diseño de cerca.
              </p>
            </div>

            <div
              className="mt-8 flex flex-wrap items-center gap-3"
              role="group"
              aria-label="Filtrar modelos por colección"
            >
              <button
                type="button"
                onClick={() => setCollectionFilter('all')}
                aria-pressed={collectionFilter === 'all'}
                className={`min-h-[48px] px-5 py-2.5 rounded-xl text-base font-semibold whitespace-nowrap transition-colors ${
                  collectionFilter === 'all'
                    ? 'bg-[#1A1918] text-white'
                    : 'bg-white text-[#1A1918] border border-[#D4CEC3] hover:bg-[#EFEAE2]'
                }`}
              >
                Todos los modelos
              </button>

              <button
                type="button"
                onClick={() => setCollectionFilter('primera')}
                aria-pressed={collectionFilter === 'primera'}
                className={`min-h-[48px] px-5 py-2.5 rounded-xl text-base font-semibold whitespace-nowrap transition-colors ${
                  collectionFilter === 'primera'
                    ? 'bg-[#1A1918] text-white'
                    : 'bg-white text-[#1A1918] border border-[#D4CEC3] hover:bg-[#EFEAE2]'
                }`}
              >
                Primera colección
              </button>

              <button
                type="button"
                onClick={() => setCollectionFilter('madera')}
                aria-pressed={collectionFilter === 'madera'}
                className={`min-h-[48px] px-5 py-2.5 rounded-xl text-base font-semibold whitespace-nowrap transition-colors ${
                  collectionFilter === 'madera'
                    ? 'bg-[#1A1918] text-white'
                    : 'bg-white text-[#1A1918] border border-[#D4CEC3] hover:bg-[#EFEAE2]'
                }`}
              >
                Nueva colección · Mango de madera
              </button>
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

        {/* PERSONALIZADOS */}
        <section
          id="personalizados"
          aria-labelledby="personalizados-titulo"
          className="py-16 sm:py-20 bg-[#F2EFEA] border-y border-[#E5E0D8]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-7 sm:p-12 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 text-[#44403C] text-[0.95rem] font-semibold">
                <Palette className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Opciones a pedido</span>
              </div>

              <h2
                id="personalizados-titulo"
                className="font-display text-3xl sm:text-4xl font-semibold text-[#1A1918] mt-3 tracking-tight"
              >
                {CUSTOM_CONTENT.title}
              </h2>

              <p className="mt-4 text-lg text-[#3F3A36] leading-relaxed">
                {CUSTOM_CONTENT.description}
              </p>

              <p className="mt-3 text-base text-[#57534E] leading-relaxed">
                {CUSTOM_CONTENT.availabilityNote}
              </p>

              <div className="mt-8">
                <a
                  href={customWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 min-h-[56px] px-7 py-3.5 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-base sm:text-lg font-semibold transition-colors w-full sm:w-auto text-center"
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
        </section>

        {/* SOBRE NOSOTROS */}
        <section
          id="sobre-nosotros"
          aria-labelledby="sobre-titulo"
          className="py-16 sm:py-20"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E0D8] bg-[#EFEAE2]">
                  <SafeImage
                    src={ABOUT_CONTENT.image}
                    alt={ABOUT_CONTENT.imageAlt}
                    fallbackTitle="Taller Caminemos Juntos"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-6">
                <h2
                  id="sobre-titulo"
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#1A1918] tracking-tight"
                >
                  {ABOUT_CONTENT.title}
                </h2>

                <p className="mt-5 text-lg text-[#1A1918] leading-relaxed font-medium">
                  {ABOUT_CONTENT.leadParagraph}
                </p>

                <p className="mt-4 text-base sm:text-lg text-[#3F3A36] leading-relaxed">
                  {ABOUT_CONTENT.bodyParagraph}
                </p>

                <ul className="mt-7 border-t border-[#E5E0D8] divide-y divide-[#E5E0D8] text-base text-[#3F3A36]">
                  {ABOUT_CONTENT.pillars.map((pillar) => (
                    <li key={pillar} className="py-3.5">
                      {pillar}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA */}
        <section
          aria-labelledby="pasos-titulo"
          className="py-16 sm:py-20 bg-[#F2EFEA] border-t border-[#E5E0D8]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2
                id="pasos-titulo"
                className="font-display text-3xl sm:text-4xl font-semibold text-[#1A1918] tracking-tight"
              >
                Cómo funciona
              </h2>
              <p className="mt-3 text-lg text-[#3F3A36]">
                Elegir tu bastón es simple y sin complicaciones, en tres pasos.
              </p>
            </div>

            <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <li
                  key={step.number}
                  className="bg-white border border-[#E5E0D8] rounded-2xl p-7 flex flex-col"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#1A1918] text-white font-display text-xl font-semibold tabular-nums">
                    {step.number}
                  </span>

                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1A1918] mt-5 leading-snug">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-base text-[#3F3A36] leading-relaxed">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACTO */}
        <section
          id="contacto"
          aria-labelledby="contacto-titulo"
          className="py-16 sm:py-24 bg-[#1A1918] text-[#FAF8F5] dark-surface"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7">
                <h2
                  id="contacto-titulo"
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#FAF8F5] leading-tight"
                >
                  {CONTACT_CONTENT.title}
                </h2>

                <p className="mt-4 text-lg text-[#E2DDD5] leading-relaxed max-w-2xl">
                  {CONTACT_CONTENT.subtitle}
                </p>

                <div className="mt-8">
                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 min-h-[60px] px-8 py-4 rounded-xl bg-[#1D7A4F] hover:bg-[#15603E] text-white text-lg font-semibold whitespace-nowrap transition-colors w-full sm:w-auto"
                  >
                    <MessageCircle
                      className="w-6 h-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{CONTACT_CONTENT.whatsappCta}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#252321] border border-[#3A3733] rounded-2xl p-7 sm:p-8 space-y-6">
                <div>
                  <p className="text-sm font-medium text-[#C8C2B8]">Teléfono</p>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="mt-1 inline-flex items-center gap-3 text-xl font-semibold text-[#FAF8F5] hover:underline underline-offset-4 tabular-nums min-h-[44px]"
                  >
                    <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>{SITE_CONFIG.phoneDisplay}</span>
                  </a>
                </div>

                <div className="pt-5 border-t border-[#3A3733]">
                  <p className="text-sm font-medium text-[#C8C2B8]">Instagram</p>
                  <a
                    href={SITE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-3 text-lg font-semibold text-[#FAF8F5] hover:underline underline-offset-4 break-all min-h-[44px]"
                  >
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shrink-0"
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

      <footer className="bg-[#141312] text-[#D6D3CD] border-t border-[#2E2C29] py-10 dark-surface">
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

          <p className="text-sm text-[#B8B2A8]">
            © {new Date().getFullYear()} Caminemos Juntos (CJ)
          </p>
        </div>
      </footer>

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

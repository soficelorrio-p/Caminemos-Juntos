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
    <div className="min-h-screen flex flex-col bg-[#F9F5EE] text-[#231D18]">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-5 focus:py-3 focus:rounded-xl focus:bg-[#231D18] focus:text-white focus:font-semibold"
      >
        Ir al contenido principal
      </a>

      <Header />

      <main id="contenido-principal" className="flex-1">
        {/* PORTADA / HERO */}
        <section
          id="inicio"
          aria-labelledby="hero-titulo"
          className="pt-10 pb-16 sm:pt-14 sm:pb-24 border-b border-[#E2D8C8] bg-[radial-gradient(ellipse_at_top_right,_#F0E3CF_0%,_#F9F5EE_68%)]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <p className="text-[0.95rem] font-semibold text-[#7A563B] tracking-wide">
                  Caminemos Juntos · Bastones con diseño
                </p>

                <h1
                  id="hero-titulo"
                  className="mt-3 font-display text-[2.25rem] sm:text-[2.95rem] lg:text-[3.35rem] font-semibold tracking-tight text-[#231D18] leading-[1.14]"
                >
                  Un bastón que te acompaña{' '}
                  <em className="italic font-normal text-[#6B4A32]">
                    y te representa
                  </em>
                </h1>

                <p className="mt-5 text-lg sm:text-[1.22rem] text-[#4A4037] leading-relaxed max-w-xl">
                  {HERO_CONTENT.subtitle}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4">
                  <a
                    href="#bastones"
                    className="inline-flex items-center justify-center gap-3 min-h-[54px] px-7 py-3.5 rounded-xl bg-[#231D18] hover:bg-[#3A3129] text-[#FAF7F2] text-base font-semibold whitespace-nowrap shadow-sm transition-colors"
                  >
                    <span>{HERO_CONTENT.primaryCta}</span>
                    <ArrowDown className="w-5 h-5 shrink-0" aria-hidden="true" />
                  </a>

                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 min-h-[54px] px-7 py-3.5 rounded-xl border-2 border-[#15603E] bg-[#FFFDF9] hover:bg-[#ECF7F1] text-[#114D31] text-base font-semibold whitespace-nowrap transition-colors"
                  >
                    <MessageCircle
                      className="w-5 h-5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{HERO_CONTENT.secondaryCta}</span>
                  </a>
                </div>

                <div className="mt-9 pt-6 border-t border-[#E2D8C8] flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.92rem] text-[#5C4F44] font-medium">
                  <span>Altura fija para mayor firmeza</span>
                  <span aria-hidden="true">·</span>
                  <span>Vinilos aplicados a mano</span>
                  <span aria-hidden="true">·</span>
                  <span>Atención cálida y personal</span>
                </div>
              </div>

              <div className="lg:col-span-6 flex items-stretch">
                <div className="relative w-full h-full min-h-[300px] sm:min-h-[380px] p-2.5 sm:p-3 rounded-[1.75rem] bg-[#FFFDF9] border border-[#DDD1BE] shadow-[0_22px_50px_-22px_rgba(62,45,28,0.25)]">
                  <div className="w-full h-full rounded-[1.25rem] overflow-hidden bg-[#EFE8DC]">
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
          </div>
        </section>

        {/* NUESTROS BASTONES */}
        <section
          id="bastones"
          aria-labelledby="bastones-titulo"
          className="py-16 sm:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-[0.95rem] font-semibold text-[#7A563B]">
                  Catálogo artesanal
                </p>
                <h2
                  id="bastones-titulo"
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#231D18] mt-1.5 tracking-tight"
                >
                  Nuestros bastones
                </h2>
                <p className="mt-3 text-lg text-[#4A4037] leading-relaxed">
                  Elegí el diseño que más te guste. Podés alternar entre la{' '}
                  <strong className="font-semibold text-[#231D18]">
                    foto general
                  </strong>{' '}
                  y el{' '}
                  <strong className="font-semibold text-[#231D18]">
                    detalle del vinilo
                  </strong>
                  , o tocar cualquier bastón para ver toda su descripción.
                </p>
              </div>

              <div
                className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFE7DA] border border-[#E2D8C8] rounded-2xl self-start"
                role="group"
                aria-label="Filtrar modelos por colección"
              >
                <button
                  type="button"
                  onClick={() => setCollectionFilter('all')}
                  aria-pressed={collectionFilter === 'all'}
                  className={`min-h-[46px] px-4 py-2 rounded-xl text-[0.95rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    collectionFilter === 'all'
                      ? 'bg-[#231D18] text-[#FAF7F2] shadow-xs'
                      : 'bg-transparent text-[#3D332B] hover:bg-[#FAF6EF]'
                  }`}
                >
                  Todos
                </button>

                <button
                  type="button"
                  onClick={() => setCollectionFilter('primera')}
                  aria-pressed={collectionFilter === 'primera'}
                  className={`min-h-[46px] px-4 py-2 rounded-xl text-[0.95rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    collectionFilter === 'primera'
                      ? 'bg-[#231D18] text-[#FAF7F2] shadow-xs'
                      : 'bg-transparent text-[#3D332B] hover:bg-[#FAF6EF]'
                  }`}
                >
                  Primera colección
                </button>

                <button
                  type="button"
                  onClick={() => setCollectionFilter('madera')}
                  aria-pressed={collectionFilter === 'madera'}
                  className={`min-h-[46px] px-4 py-2 rounded-xl text-[0.95rem] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    collectionFilter === 'madera'
                      ? 'bg-[#231D18] text-[#FAF7F2] shadow-xs'
                      : 'bg-transparent text-[#3D332B] hover:bg-[#FAF6EF]'
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

        {/* PERSONALIZADOS */}
        <section
          id="personalizados"
          aria-labelledby="personalizados-titulo"
          className="py-16 sm:py-24 bg-[#EFE7DA] border-y border-[#E2D8C8]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#FFFDF9] border border-[#DDD1BE] rounded-[1.75rem] p-6 sm:p-10 lg:p-12 shadow-[0_18px_44px_-22px_rgba(62,45,28,0.16)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2.5 text-[#7A563B] text-[0.95rem] font-semibold">
                  <Palette className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Opciones a pedido</span>
                </div>

                <h2
                  id="personalizados-titulo"
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#231D18] mt-3 tracking-tight"
                >
                  {CUSTOM_CONTENT.title}
                </h2>

                <p className="mt-4 text-lg text-[#3D332B] leading-relaxed">
                  {CUSTOM_CONTENT.description}
                </p>

                <p className="mt-3 text-base text-[#6C5E52] leading-relaxed">
                  {CUSTOM_CONTENT.availabilityNote}
                </p>

                <div className="mt-8">
                  <a
                    href={customWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 min-h-[56px] px-7 py-3.5 rounded-xl bg-[#15603E] hover:bg-[#0F4A2F] text-white text-base sm:text-lg font-semibold shadow-xs transition-colors w-full sm:w-auto text-center"
                  >
                    <MessageCircle
                      className="w-6 h-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{CUSTOM_CONTENT.ctaLabel}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#F6F0E6] border border-[#E5DAC8]">
                  {PRODUCTS.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="aspect-square rounded-xl overflow-hidden bg-[#EFE8DC] border border-[#E5DAC8]"
                    >
                      <SafeImage
                        src={item.detailImage}
                        alt={item.detailAlt}
                        fallbackTitle={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-center text-[0.9rem] font-medium text-[#6C5E52]">
                  Detalles reales de nuestros vinilos impresos
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOBRE NOSOTROS */}
        <section
          id="sobre-nosotros"
          aria-labelledby="sobre-titulo"
          className="py-16 sm:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6">
                <div className="p-2.5 sm:p-3 rounded-[1.75rem] bg-[#FFFDF9] border border-[#DDD1BE] shadow-[0_18px_44px_-22px_rgba(62,45,28,0.18)]">
                  <div className="aspect-[4/3] rounded-[1.25rem] overflow-hidden bg-[#EFE8DC]">
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
                <p className="text-[0.95rem] font-semibold text-[#7A563B]">
                  Nuestra historia y propósito
                </p>
                <h2
                  id="sobre-titulo"
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#231D18] mt-1.5 tracking-tight"
                >
                  {ABOUT_CONTENT.title}
                </h2>

                <blockquote className="mt-5 font-display text-xl sm:text-[1.35rem] text-[#231D18] leading-relaxed font-normal italic">
                  “{ABOUT_CONTENT.leadParagraph}”
                </blockquote>

                <p className="mt-4 text-base sm:text-lg text-[#4A4037] leading-relaxed">
                  {ABOUT_CONTENT.bodyParagraph}
                </p>

                <ul className="mt-7 border-t border-[#E2D8C8] divide-y divide-[#E2D8C8] text-base text-[#3D332B]">
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
          className="py-16 sm:py-24 bg-[#EFE7DA] border-t border-[#E2D8C8]"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-[0.95rem] font-semibold text-[#7A563B]">
                Paso a paso
              </p>
              <h2
                id="pasos-titulo"
                className="font-display text-3xl sm:text-4xl font-semibold text-[#231D18] mt-1.5 tracking-tight"
              >
                Cómo funciona
              </h2>
              <p className="mt-3 text-lg text-[#4A4037]">
                Elegir tu bastón es simple y sin complicaciones, en tres pasos.
              </p>
            </div>

            <ol className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {HOW_IT_WORKS_STEPS.map((step) => (
                <li
                  key={step.number}
                  className="bg-[#FFFDF9] border border-[#DDD1BE] rounded-[1.5rem] p-7 sm:p-8 flex flex-col shadow-[0_10px_28px_-16px_rgba(62,45,28,0.12)]"
                >
                  <div className="flex items-baseline justify-between pb-4 border-b border-[#EDE5D8]">
                    <span className="font-display text-4xl font-semibold text-[#7A563B] tabular-nums leading-none">
                      0{step.number}
                    </span>
                    <span className="text-[0.85rem] font-medium text-[#6C5E52]">
                      Paso {step.number} de 3
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#231D18] mt-5 leading-snug">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-base text-[#4A4037] leading-relaxed">
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
          className="py-16 sm:py-24 bg-[#231D18] text-[#FAF6EF] dark-surface"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-7">
                <p className="text-[0.95rem] font-semibold text-[#D6B89A]">
                  Estamos para acompañarte
                </p>
                <h2
                  id="contacto-titulo"
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#FAF6EF] mt-2 leading-tight"
                >
                  {CONTACT_CONTENT.title}
                </h2>

                <p className="mt-4 text-lg text-[#E4DDD2] leading-relaxed max-w-2xl">
                  {CONTACT_CONTENT.subtitle}
                </p>

                <div className="mt-8">
                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 min-h-[60px] px-8 py-4 rounded-xl bg-[#1D7A4F] hover:bg-[#15603E] text-white text-lg font-semibold whitespace-nowrap shadow-md transition-colors w-full sm:w-auto"
                  >
                    <MessageCircle
                      className="w-6 h-6 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{CONTACT_CONTENT.whatsappCta}</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#2F2721] border border-[#483C33] rounded-[1.5rem] p-7 sm:p-8 space-y-6">
                <div>
                  <p className="text-sm font-medium text-[#D3C8BA]">Teléfono</p>
                  <a
                    href={SITE_CONFIG.phoneHref}
                    className="mt-1 inline-flex items-center gap-3 text-xl font-semibold text-[#FAF6EF] hover:underline underline-offset-4 tabular-nums min-h-[44px]"
                  >
                    <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>{SITE_CONFIG.phoneDisplay}</span>
                  </a>
                </div>

                <div className="pt-5 border-t border-[#483C33]">
                  <p className="text-sm font-medium text-[#D3C8BA]">Instagram</p>
                  <a
                    href={SITE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-3 text-lg font-semibold text-[#FAF6EF] hover:underline underline-offset-4 break-all min-h-[44px]"
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

      <footer className="bg-[#1A1511] text-[#D9D0C3] border-t border-[#362D26] py-10 dark-surface">
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

          <p className="text-sm text-[#BFB4A6]">
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

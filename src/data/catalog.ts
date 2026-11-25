import heroBastonArte from '../assets/images/hero_baston_arte_1794856236209.jpg';
import jackImagen1 from '../assets/images/jack-imagen1.jpg';
import jackImagen2 from '../assets/images/jack-imagen2.jpg';
import jackImagen3 from '../assets/images/jack-imagen3.jpg';
import papaImagen1 from '../assets/images/papa-imagen1.png';
import papaImagen2 from '../assets/images/papa-imagen2.png';
import papaImagen3 from '../assets/images/papa-imagen3.png';
import sobreNosotrosTaller from '../assets/images/sobre_nosotros_taller_1794832411962.jpg';
import vinilosArteTaller from '../assets/images/vinilos_arte_taller_1794856236121.jpg';

export interface CaneImage {
  src: string;
  alt: string;
  label: string;
}

export interface CaneProduct {
  id: string;
  name: string;
  materialLabel: string;
  price: string;
  handleType: string;
  vinylDesign: string;
  heightCm: number;
  fixedHeightNote: string;
  description: string;
  extendedDescription: string;
  images: CaneImage[];
  whatsappMessage: string;
  accentHex: string;
  matTintHex: string;
}

/**
 * CONFIGURACIÓN EDITABLE DE CAMINEMOS JUNTOS (CJ)
 * Modificá aquí el número de WhatsApp, teléfono, Instagram y textos principales.
 * El número de WhatsApp debe ir con código de país y sin símbolos (ej: "5491112345678").
 */
export const SITE_CONFIG = {
  brandName: 'Caminemos Juntos',
  brandInitials: 'CJ',
  whatsappNumber: '5491127200888',
  phoneDisplay: '+54 9 11 2720-0888',
  phoneHref: 'tel:+5491127200888',
  instagramHandle: 'bastones_caminemosjuntos',
  instagramUrl:
    'https://www.instagram.com/bastones_caminemosjuntos/?utm_source=ig_web_button_share_sheet',
  paymentMethods: 'Transferencia o efectivo',
  generalWhatsappMessage:
    'Hola, quiero recibir asesoramiento sobre los bastones de Caminemos Juntos.',
  customWhatsappMessage:
    'Hola, quiero consultar por un bastón con diseño personalizado.',
} as const;

export function buildWhatsAppUrl(message: string): string {
  const cleanNumber = SITE_CONFIG.whatsappNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

export const HERO_CONTENT = {
  title: 'Un bastón que te acompaña y te representa',
  subtitle:
    'Diseños pensados para que cada paso sea más cómodo, seguro y con estilo.',
  primaryCta: 'Ver bastones',
  secondaryCta: 'Consultar por WhatsApp',
  heroImage: heroBastonArte,
  heroImageAlt:
    'Bastón intervenido con diseño floral colorido en un taller artístico luminoso junto a girasoles y un jarrón azul cobalto',
} as const;

export const CUSTOM_CONTENT = {
  title: 'Diseños personalizados',
  description:
    'Además de nuestros modelos, podés consultarnos por opciones personalizadas según tu estilo (sujeto a disponibilidad).',
  ctaLabel: 'Quiero consultar un diseño personalizado',
  studioImage: vinilosArteTaller,
  studioImageAlt:
    'Muestrario colorido de vinilos artísticos con flores, tramas geométricas azules y botánicas junto a mangos de madera en el taller',
} as const;

export const ABOUT_CONTENT = {
  title: 'Sobre nosotros',
  leadParagraph:
    'En Caminemos Juntos creemos que usar un bastón también puede ser una experiencia más amable, personal y cómoda. Trabajamos con diseños únicos para que cada persona se sienta identificada y segura al usarlo.',
  image: sobreNosotrosTaller,
  imageAlt:
    'Manos artesanales aplicando cuidadosamente un vinilo botánico sobre el cuerpo de un bastón en un taller luminoso',
} as const;

export const HOW_IT_WORKS_STEPS = [
  {
    number: '1',
    title: 'Elegí el diseño',
    description:
      'Mirá las fotos y tocá Ver detalle para conocer su descripción y altura.',
  },
  {
    number: '2',
    title: 'Consultanos por WhatsApp',
    description:
      'Tocá el botón del modelo que te gustó para escribirnos directamente.',
  },
  {
    number: '3',
    title: 'Te asesoramos',
    description:
      'Confirmamos la altura adecuada, coordinamos la entrega y abonás por transferencia o efectivo.',
  },
] as const;

export const CONTACT_CONTENT = {
  title: '¿Te ayudamos a elegir tu bastón?',
  subtitle:
    'Escribinos por WhatsApp o llamanos para recibir asesoramiento personalizado.',
  whatsappCta: 'Consultar ahora por WhatsApp',
} as const;

/**
 * CATÁLOGO DE PRODUCTOS (EDITABLE)
 * Podés agregar, quitar o modificar modelos cambiando nombre, precio, altura en cm,
 * descripción e imágenes.
 */
export const PRODUCTS: CaneProduct[] = [
  {
    id: 'jack-sparrow',
    name: 'Bastón Jack Sparrow',
    materialLabel: 'Mango de madera',
    price: '$100.000',
    handleType: 'Mango de madera lustrada',
    vinylDesign: 'Vinilo impreso artístico Jack Sparrow, navío y brújula',
    heightCm: 90,
    fixedHeightNote: 'Fijo',
    description:
      'Diseño ilustrado inspirado en la aventura marítima, con brújula, navío y detalles en tonos cálidos sobre mapa antiguo.',
    extendedDescription:
      'Intervenido con vinilo impreso de alta definición en toda su extensión, acompañado por un mango curvo de madera lustrada con anillo dorado. Altura fija para brindar un apoyo firme y seguro.',
    images: [
      {
        src: jackImagen1,
        alt: 'Bastón Jack Sparrow junto al detalle extendido del diseño completo en vinilo',
        label: 'Bastón y diseño',
      },
      {
        src: jackImagen2,
        alt: 'Vista completa del Bastón Jack Sparrow con mango de madera lustrada y regatón negro',
        label: 'Bastón completo',
      },
      {
        src: jackImagen3,
        alt: 'Primer plano de la lámina del vinilo artístico de Jack Sparrow, barco y brújula',
        label: 'Detalle del vinilo',
      },
    ],
    whatsappMessage:
      'Hola, quiero consultar por el Bastón Jack Sparrow ($100.000).',
    accentHex: '#8E3F27',
    matTintHex: '#F4ECE0',
  },
  {
    id: 'papa-leon-xiv',
    name: 'Bastón Papa León XIV',
    materialLabel: 'Mango de madera',
    price: '$100.000',
    handleType: 'Mango de madera lustrada',
    vinylDesign:
      'Vinilo impreso Papa León XIV, Basílica de San Pedro, Basílica de Luján y ornamentos dorados',
    heightCm: 90,
    fixedHeightNote: 'Fijo',
    description:
      'Diseño homenaje al Papa León XIV sobre fondo marfil cálido, con detalles dorados, la Basílica de San Pedro y la Basílica de Luján.',
    extendedDescription:
      'Intervenido con vinilo impreso de alta definición en toda su extensión, acompañado por un mango curvo de madera lustrada con anillo dorado. Altura fija para brindar un apoyo firme y seguro.',
    images: [
      {
        src: papaImagen1,
        alt: 'Bastón Papa León XIV junto al detalle extendido del diseño completo en vinilo',
        label: 'Bastón y diseño',
      },
      {
        src: papaImagen2,
        alt: 'Vista completa del Bastón Papa León XIV con mango de madera lustrada y regatón negro',
        label: 'Bastón completo',
      },
      {
        src: papaImagen3,
        alt: 'Primer plano de la lámina del vinilo artístico del Papa León XIV y la Basílica de Luján',
        label: 'Detalle del vinilo',
      },
    ],
    whatsappMessage:
      'Hola, quiero consultar por el Bastón Papa León XIV ($100.000).',
    accentHex: '#8E3F27',
    matTintHex: '#F4ECE0',
  },
];

export type CaneCollectionId = 'primera' | 'madera';

export interface CaneProduct {
  id: string;
  name: string;
  collection: CaneCollectionId;
  collectionLabel: string;
  handleType: string;
  vinylDesign: string;
  heightCm: number;
  fixedHeightNote: string;
  description: string;
  extendedDescription: string;
  generalImage: string;
  generalAlt: string;
  detailImage: string;
  detailAlt: string;
  whatsappMessage: string;
}

/**
 * CONFIGURACIÓN EDITABLE DE CAMINEMOS JUNTOS (CJ)
 * Modificá aquí el número de WhatsApp, teléfono, correo y textos principales.
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
  heroImage: '/src/assets/images/hero_baston_principal_1794832406587.jpg',
  heroImageAlt:
    'Bastón elegante con mango de madera tallada y diseño botánico en vinilo apoyado suavemente sobre un sillón luminoso',
} as const;

export const CUSTOM_CONTENT = {
  title: 'Diseños personalizados a consulta',
  description:
    'Además de nuestros diseños disponibles, también podés consultarnos por opciones personalizadas para encontrar un bastón que vaya con tu estilo.',
  availabilityNote:
    'Cada diseño personalizado se conversa y evalúa según disponibilidad antes de confirmarlo.',
  ctaLabel: 'Quiero consultar un diseño personalizado',
} as const;

export const ABOUT_CONTENT = {
  title: 'Sobre nosotros',
  leadParagraph:
    'En Caminemos Juntos creemos que usar un bastón también puede ser una experiencia más amable, personal y cómoda. Por eso trabajamos con diseños que ayudan a que cada persona se sienta identificada con el bastón que usa.',
  bodyParagraph:
    'Acompañamos a personas mayores y a sus familias para que el bastón deje de sentirse como algo frío o incómodo, y pase a ser un objeto práctico, firme y lindo para usar todos los días.',
  image: '/src/assets/images/sobre_nosotros_taller_1794832411962.jpg',
  imageAlt:
    'Manos artesanales aplicando cuidadosamente un vinilo botánico sobre el cuerpo de un bastón en un taller luminoso',
  pillars: [
    'Vinilos impresos de alta duración aplicados con cuidado artesanal.',
    'Todos nuestros bastones son de altura fija (no regulables) para brindar mayor firmeza.',
    'Te asesoramos personalmente por WhatsApp para elegir la medida correcta.',
  ],
} as const;

export const HOW_IT_WORKS_STEPS = [
  {
    number: '1',
    title: 'Elegí el diseño que más te guste',
    description:
      'Mirá los modelos disponibles, alterná entre la foto general y el detalle del vinilo, y tocá Ver detalle para conocer su descripción y altura.',
  },
  {
    number: '2',
    title: 'Consultanos por WhatsApp',
    description:
      'Tocá el botón verde del modelo que te interesó o escribinos directamente. No hay carritos ni formularios difíciles.',
  },
  {
    number: '3',
    title: 'Te ayudamos a encontrar la mejor opción',
    description:
      'Conversamos con vos o con un familiar para confirmar la altura adecuada, responder dudas y coordinar el envío o retiro.',
  },
] as const;

export const CONTACT_CONTENT = {
  title:
    '¿Querés encontrar un bastón que te haga sentir más cómodo y seguro? Estamos para ayudarte.',
  subtitle:
    'Escribinos por WhatsApp o llamanos por teléfono. Respondemos con paciencia y claridad para ayudarte a elegir.',
  whatsappCta: 'Consultar ahora por WhatsApp',
} as const;

/**
 * CATÁLOGO DE PRODUCTOS (EDITABLE)
 * Podés agregar, quitar o modificar modelos cambiando nombre, altura en cm,
 * tipo de colección ('primera' o 'madera'), descripción y rutas de fotos.
 */
export const PRODUCTS: CaneProduct[] = [
  {
    id: 'olivo-botanico',
    name: 'Modelo Olivo Botánico',
    collection: 'primera',
    collectionLabel: 'Primera colección',
    handleType: 'Mango clásico ergonómico',
    vinylDesign: 'Vinilo impreso botánico verde oliva sobre marfil',
    heightCm: 88,
    fixedHeightNote: 'Fijo',
    description:
      'Un diseño sereno con hojas naturales en tonos oliva que aporta frescura y calidez para el uso diario.',
    extendedDescription:
      'Pensado para quienes disfrutan de los motivos naturales y tranquilos. El vinilo botánico se aplica con terminación satinada suave al tacto y resistente al roce diario. Su mango clásico anatómico acompaña la palma de la mano de forma cómoda y segura.',
    generalImage: '/src/assets/images/baston_botanico_general_1794832407309.jpg',
    generalAlt:
      'Vista completa del bastón Modelo Olivo Botánico con mango negro ergonómico y vinilo de hojas verde oliva',
    detailImage: '/src/assets/images/baston_botanico_detalle_1794832408145.jpg',
    detailAlt:
      'Primer plano del detalle del vinilo botánico con hojas de olivo aplicado sobre el bastón',
    whatsappMessage:
      'Hola, quiero consultar por el bastón Modelo Olivo Botánico (Primera colección, 88 cm).',
  },
  {
    id: 'indigo-clasico',
    name: 'Modelo Índigo Clásico',
    collection: 'primera',
    collectionLabel: 'Primera colección',
    handleType: 'Mango clásico ergonómico',
    vinylDesign: 'Vinilo impreso geométrico azul índigo y arena',
    heightCm: 90,
    fixedHeightNote: 'Fijo',
    description:
      'Trama sobria y distinguida en azul profundo con líneas arena, pensada para combinar con cualquier vestimenta.',
    extendedDescription:
      'Ideal para quienes prefieren un estilo clásico y discreto, fácil de combinar tanto en salidas cotidianas como en ocasiones especiales. Su estructura fija evita ruidos o movimientos indeseados al caminar y brinda un apoyo estable en todo momento.',
    generalImage: '/src/assets/images/baston_indigo_general_1794832408102.jpg',
    generalAlt:
      'Vista completa del bastón Modelo Índigo Clásico con mango negro anatómico y diseño geométrico azul índigo',
    detailImage: '/src/assets/images/baston_indigo_detalle_1794832408819.jpg',
    detailAlt:
      'Primer plano del vinilo impreso geométrico azul índigo y arena sobre el cuerpo del bastón',
    whatsappMessage:
      'Hola, quiero consultar por el bastón Modelo Índigo Clásico (Primera colección, 90 cm).',
  },
  {
    id: 'nogal-espiga',
    name: 'Modelo Nogal Espiga',
    collection: 'madera',
    collectionLabel: 'Nueva colección · Mango de madera',
    handleType: 'Mango de madera lustrada',
    vinylDesign: 'Vinilo impreso espiga gris topo y grafito',
    heightCm: 92,
    fixedHeightNote: 'Fijo',
    description:
      'Elegancia clásica con mango curvo de madera lustrada al tacto suave y un diseño textil discreto en tonos neutros.',
    extendedDescription:
      'Parte de nuestra nueva colección con mango de madera. La calidez de la madera lustrada se combina con un vinilo de textura tipo espiga en tonos neutros, logrando un bastón sobrio, distinguido y muy agradable de llevar.',
    generalImage: '/src/assets/images/baston_nogal_general_1794832409216.jpg',
    generalAlt:
      'Vista completa del bastón Modelo Nogal Espiga con mango de madera oscura y vinilo trama espiga',
    detailImage: '/src/assets/images/baston_nogal_detalle_1794832411390.jpg',
    detailAlt:
      'Primer plano de la unión entre el mango de madera de nogal y el vinilo impreso con diseño espiga',
    whatsappMessage:
      'Hola, quiero consultar por el bastón Modelo Nogal Espiga (Nueva colección mango de madera, 92 cm).',
  },
  {
    id: 'roble-terracota',
    name: 'Modelo Roble Terracota',
    collection: 'madera',
    collectionLabel: 'Nueva colección · Mango de madera',
    handleType: 'Mango de madera natural',
    vinylDesign: 'Vinilo impreso geométrico terracota y arena',
    heightCm: 89,
    fixedHeightNote: 'Fijo',
    description:
      'Mango cálido en madera natural combinado con un vinilo de trazos geométricos suaves en tonos tierra.',
    extendedDescription:
      'Un modelo con mucha personalidad y armonía visual. El mango en madera natural ofrece un agarre cálido y firme, mientras que el vinilo en tonos terracota, arena y espresso aporta un detalle artístico delicado y moderno.',
    generalImage: '/src/assets/images/baston_terracota_general_1794832410589.jpg',
    generalAlt:
      'Vista completa del bastón Modelo Roble Terracota con mango de madera clara y vinilo geométrico cálido',
    detailImage: '/src/assets/images/baston_terracota_detalle_1794832411462.jpg',
    detailAlt:
      'Primer plano del mango de roble natural junto al vinilo impreso en tonos terracota y arena',
    whatsappMessage:
      'Hola, quiero consultar por el bastón Modelo Roble Terracota (Nueva colección mango de madera, 89 cm).',
  },
];

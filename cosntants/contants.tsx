import { Product } from "@/types/types";


export const PRODUCTS: Product[] = [
  {
    id: 'rolex-sub-clone',
    brand: 'Rolex',
    name: 'Submariner Date Black Dial Clone',
    category: 'Watches',
    basePrice: 5200,
    msrp: 6500,
    isClone: true,
    movement: 'Automático',
    image: 'https://images.unsplash.com/photo-1587836374828-4dbaba94cf0e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1587836374828-4dbaba94cf0e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'Clone de alta fidelidade com acabamento industrial de ponta. Aço 904L e safira anti-reflexo. Este modelo representa o ápice da engenharia reversa, com cada componente meticulosamente replicado para garantir que o peso, o toque e a funcionalidade sejam idênticos ao original suíço. O bezel cerâmico unidirecional possui uma rotação suave de 120 cliques, e o mostrador exibe uma luminosidade Chromalight de longa duração.',
    tags: ['rolexclone', 'relogioclone', 'submariner', 'v12'],
    factories: [
      { factory: 'EW', price: 5200, description: 'Opção Econômica: Maquinário robusto e acabamento fiel.' },
      { factory: 'CLEAN', price: 7800, description: 'Super Clone: Nível colecionador, acabamento e bezel cerâmico impecáveis.' },
      { factory: 'VSF', price: 9500, description: 'Super Clone Movimento Original: Maquinário clonado 1:1 e precisão extrema.' }
    ],
    specs: {
      general: { 'BRAND': 'Rolex', 'SERIES': 'Submariner', 'MODEL': '126610LN', 'GENDER': 'Men\'s' },
      case: { 'CASE SIZE': '41 mm', 'CASE THICKNESS': '12.3 mm', 'CASE MATERIAL': '904L Stainless Steel', 'CASE SHAPE': 'Round' },
      band: { 'BAND MATERIAL': '904L Oyster Steel', 'BAND TYPE': 'Bracelet', 'CLASP': 'Oysterlock Safety Clasp' },
      dial: { 'DIAL COLOR': 'Black', 'CRYSTAL': 'Scratch Resistant Sapphire', 'HANDS': 'Mercedes-style', 'LUMINESCENCE': 'Blue Chromalight' }
    }
  },
  {
    id: 'rolex-daytona-clone',
    brand: 'Rolex',
    name: 'Daytona Panda Clone',
    category: 'Watches',
    basePrice: 6500,
    msrp: 8200,
    isClone: true,
    movement: 'Automático',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1587836374828-4dbaba94cf0e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&q=80&w=800'
    ],
    description: 'O cronógrafo mais desejado do mundo em sua melhor versão clone com cronógrafo funcional. O calibre 4130 clonado oferece uma reserva de marcha impressionante e uma precisão cronométrica sem paralelos no mercado de clones. O mostrador "Panda" é finalizado com sub-mostradores concêntricos perfeitos e uma escala taquimétrica gravada a laser no bezel de cerâmica negra.',
    tags: ['rolexclone', 'relogioclone', 'daytona', 'panda'],
    factories: [
      { factory: 'EW', price: 6500, description: 'Opção Econômica com cronógrafo funcional.' },
      { factory: 'CLEAN', price: 12500, description: 'Super Clone: Movimento 4130 clonado, espessura original da caixa.' },
      { factory: 'VSF', price: 13900, description: 'Super Clone Movimento Original: A perfeição absoluta em todos os detalhes.' }
    ],
    specs: {
      general: { 'BRAND': 'Rolex', 'SERIES': 'Daytona', 'MODEL': '116500LN', 'GENDER': 'Unisex' },
      case: { 'CASE SIZE': '40 mm', 'CASE THICKNESS': '12.2 mm', 'CASE MATERIAL': '904L Stainless Steel', 'BEZEL': 'Black Ceramic' },
      movement: { 'MOVEMENT': 'Clone Calibre 4130', 'RESERVE': '72 Hours', 'FUNCTIONS': 'Chronograph, Hour, Minute, Second' }
    }
  }
];

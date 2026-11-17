export type CurrencyCode = 'IDR' | 'USD';

export type ScreenKey = 'overview' | 'stays' | 'experiences' | 'village' | 'reserve';

export type HomestayCategory = 'All' | 'Bamboo Villa' | 'Heritage Joglo' | 'Canopy Loft';

export type ExperienceCategory = 'All' | 'Agro-Walk' | 'Culinary' | 'Craft' | 'Trail';

export interface Homestay {
  id: string;
  name: string;
  category: Exclude<HomestayCategory, 'All'>;
  elevationMeters: number;
  maxGuests: number;
  bedrooms: number;
  areaSqm: number;
  pricePerNightIdr: number;
  rating: number;
  reviewCount: number;
  summary: string;
  architecturalNote: string;
  amenities: string[];
  sustainabilityHighlights: string[];
  image: string;
  imageFocusClass?: string;
}

export interface HighlandExperience {
  id: string;
  name: string;
  category: Exclude<ExperienceCategory, 'All'>;
  scheduleWib: string;
  durationLabel: string;
  trailDistanceKm?: number;
  elevationGainM?: number;
  pricePerGuestIdr: number;
  summary: string;
  includedItems: string[];
  hostName: string;
  hostRole: string;
  image: string;
  featured?: boolean;
}

export interface StewardshipMetric {
  id: string;
  value: string;
  label: string;
  context: string;
}

export interface GuestStory {
  id: string;
  guestName: string;
  roleAndOrigin: string;
  stayUnit: string;
  beforeContext: string;
  outcomeQuote: string;
}

export interface VillageSeason {
  id: string;
  months: string;
  name: string;
  tempRange: string;
  harvestFocus: string;
  trailCondition: string;
}

export const IMAGES = {
  heroSanctuary: '/src/assets/images/hero_highland_sanctuary_1794893078557.jpg',
  bambooVilla: '/src/assets/images/villa_bamboo_canopy_1794893079399.jpg',
  heritageJoglo: '/src/assets/images/villa_heritage_joglo_1794893079539.jpg',
  coffeeHarvest: '/src/assets/images/exp_coffee_harvest_1794893080181.jpg',
  hearthCulinary: '/src/assets/images/exp_hearth_culinary_1794893081312.jpg',
} as const;

export const VILLAGE_NOTICE = {
  seasonTag: 'Arabica Blossom & Clear Ridge Season',
  message:
    'Morning ridge trails are dry and clear at 1,350m. Dawn temperatures average 15°C — bring a light knit layer for sunrise coffee walks.',
};

export const HOMESTAYS: Homestay[] = [
  {
    id: 'surya-bamboo-canopy',
    name: 'Surya Bamboo Canopy Villa',
    category: 'Bamboo Villa',
    elevationMeters: 1380,
    maxGuests: 2,
    bedrooms: 1,
    areaSqm: 68,
    pricePerNightIdr: 1450000,
    rating: 4.94,
    reviewCount: 48,
    summary:
      'Cantilevered petung bamboo residence opening directly onto terraced arabica slopes and drifting morning mist.',
    architecturalNote:
      'Constructed with locally harvested petung bamboo lashed by Central Javanese joiners without structural steel.',
    amenities: [
      'Private eastern sunrise veranda',
      'Spring-fed rain shower with solar heating',
      'Hand-loomed organic cotton bedding',
      'Pour-over single-origin coffee kit',
      'High-speed solar-backed workspace',
    ],
    sustainabilityHighlights: [
      '100% gravity-fed mountain spring water',
      'Zero single-use plastics in amenities',
      'Solar thermal water heating',
    ],
    image: IMAGES.bambooVilla,
  },
  {
    id: 'pendopo-jati-joglo',
    name: 'Pendopo Jati Heritage Joglo',
    category: 'Heritage Joglo',
    elevationMeters: 1340,
    maxGuests: 4,
    bedrooms: 2,
    areaSqm: 112,
    pricePerNightIdr: 2150000,
    rating: 4.97,
    reviewCount: 62,
    summary:
      'Restored 1930s reclaimed teak Joglo pavilion tucked inside an organic culinary herb and tree-fern garden.',
    architecturalNote:
      'Four central soko guru teak pillars reassembled piece-by-piece from an ancestral village residence in Temanggung.',
    amenities: [
      'Two adjoining teak bedrooms',
      'Covered terracotta-tiled veranda',
      'Wood-burning hearth lounge',
      'Private garden herbal tea terrace',
      'Daily highland breakfast included',
    ],
    sustainabilityHighlights: [
      'Reclaimed 90-year-old Javanese teak timber',
      'Permaculture kitchen garden greywater loop',
      'Beeswax & botanical amenity refills',
    ],
    image: IMAGES.heritageJoglo,
  },
  {
    id: 'kabut-ridge-loft',
    name: 'Kabut Ridge Terrace Loft',
    category: 'Canopy Loft',
    elevationMeters: 1410,
    maxGuests: 2,
    bedrooms: 1,
    areaSqm: 56,
    pricePerNightIdr: 1280000,
    rating: 4.91,
    reviewCount: 34,
    summary:
      'Elevated upper-terrace loft framed by tree ferns with an unobstructed panoramic sightline across Mount Sindoro.',
    architecturalNote:
      'Lifted on volcanic river-stone footings to preserve natural rainwater runoff channels along the slope.',
    amenities: [
      'Wrap-around bamboo observation deck',
      'Daybed overlooking volcanic ridge',
      'Acoustic silence zone (vehicle-free)',
      'Morning artisan bread & highland jam basket',
    ],
    sustainabilityHighlights: [
      'Permeable volcanic stone foundations',
      '100% passive cross-ventilation cooling',
      'Native fern slope stabilization',
    ],
    image: IMAGES.heroSanctuary,
    imageFocusClass: 'object-right',
  },
  {
    id: 'tirta-spring-residence',
    name: 'Tirta Spring Courtyard Residence',
    category: 'Heritage Joglo',
    elevationMeters: 1325,
    maxGuests: 6,
    bedrooms: 3,
    areaSqm: 148,
    pricePerNightIdr: 2850000,
    rating: 4.96,
    reviewCount: 29,
    summary:
      'Spacious multi-generational timber sanctuary beside a natural highland spring pool and private family dining deck.',
    architecturalNote:
      'Designed around an open central courtyard where families gather around a warm volcanic-stone fire pit at dusk.',
    amenities: [
      'Three quiet garden bedrooms',
      'Private natural spring soaking basin',
      'Dedicated family dining pavilion',
      'Complimentary private farmer-guided walk',
    ],
    sustainabilityHighlights: [
      'Zero-chlorine filtered mountain spring basin',
      'Composted organic kitchen garden loop',
      'Locally woven pandan and rattan interiors',
    ],
    image: IMAGES.hearthCulinary,
  },
];

export const EXPERIENCES: HighlandExperience[] = [
  {
    id: 'sunrise-arabica-walk',
    name: 'Sunrise Ridge & Arabica Harvest Walk',
    category: 'Agro-Walk',
    scheduleWib: '05:30 WIB',
    durationLabel: '3.5 hrs',
    trailDistanceKm: 4.2,
    elevationGainM: 185,
    pricePerGuestIdr: 320000,
    summary:
      'Walk mist-wrapped terrace footpaths with fourth-generation coffee farmers, pick ripe red cherries in season, and brew single-origin pour-over at the ridge overlook.',
    includedItems: [
      'Local farmer guide & woven harvest basket',
      'Field pour-over tasting & roasted palm-sugar snack',
      '250g small-batch village arabica beans to take home',
    ],
    hostName: 'Pak Darmo',
    hostRole: 'Lead Coffee Agroforester',
    image: IMAGES.coffeeHarvest,
    featured: true,
  },
  {
    id: 'farm-to-hearth-table',
    name: 'Farm-to-Hearth Highland Culinary Table',
    category: 'Culinary',
    scheduleWib: '18:00 WIB',
    durationLabel: '2.5 hrs',
    pricePerGuestIdr: 410000,
    summary:
      'Harvest heirloom mountain greens at dusk and cook side-by-side over a traditional clay wood-hearth before dining under warm veranda lanterns.',
    includedItems: [
      'Guided late-afternoon permaculture garden harvest',
      'Five-course Central Javanese highland supper',
      'Warm spiced wedang jahe & wildflower infusions',
    ],
    hostName: 'Ibu Sari',
    hostRole: 'Village Hearth Chef',
    image: IMAGES.hearthCulinary,
  },
  {
    id: 'bamboo-indigo-craft',
    name: 'Bamboo Joinery & Natural Indigo Workshop',
    category: 'Craft',
    scheduleWib: '10:00 WIB',
    durationLabel: '2.5 hrs',
    pricePerGuestIdr: 280000,
    summary:
      'Spend a quiet morning in the open-air village pavilion learning hand-split bamboo weaving and natural plant-indigo textile dyeing.',
    includedItems: [
      'All natural fermented indigo vat & organic cotton scarf',
      'Hand-carved bamboo utensil keepsake',
      'Herbal tea & steamed cassava cakes',
    ],
    hostName: 'Mas Teguh',
    hostRole: 'Master Bamboo Artisan',
    image: IMAGES.bambooVilla,
  },
  {
    id: 'cloud-forest-spring-trail',
    name: 'Volcanic Spring & Cloud-Forest Trail',
    category: 'Trail',
    scheduleWib: '07:30 WIB',
    durationLabel: '3.0 hrs',
    trailDistanceKm: 5.8,
    elevationGainM: 260,
    pricePerGuestIdr: 295000,
    summary:
      'Traverse shaded tree-fern ravines to the upper village watershed springs, learning how native canopy restoration safeguards dry-season water.',
    includedItems: [
      'Village conservation ranger escort',
      'Bamboo walking staff & spring picnic lunch',
      'Watershed reforestation contribution included',
    ],
    hostName: 'Mbak Rina',
    hostRole: 'Watershed Steward',
    image: IMAGES.heritageJoglo,
  },
];

export const STEWARDSHIP_METRICS: StewardshipMetric[] = [
  {
    id: 'elevation',
    value: '1,350m',
    label: 'Highland Microclimate',
    context: 'Cool 15–23°C mountain air without mechanical air conditioning',
  },
  {
    id: 'forest',
    value: '18 ha',
    label: 'Shade-Grown Coffee Forest',
    context: 'Intercropped arabica under native damar and dadap canopy since 2019',
  },
  {
    id: 'families',
    value: '24 Families',
    label: 'Village Partner Cooperative',
    context: '100% of guiding, culinary, and craft fees go directly to local households',
  },
  {
    id: 'water',
    value: '100%',
    label: 'Gravity Spring & Rainwater',
    context: 'Closed-loop biological reed beds return filtered water to terrace plots',
  },
];

export const GUEST_STORIES: GuestStory[] = [
  {
    id: 'nadia-jakarta',
    guestName: 'Nadia Kusuma',
    roleAndOrigin: 'Architectural Researcher, Jakarta',
    stayUnit: 'Surya Bamboo Canopy Villa · 4 Nights',
    beforeContext: 'Arrived burned out after six months of urban site deadlines.',
    outcomeQuote:
      'Waking at 05:30 to mist rolling off the coffee terraces and walking silently with Pak Darmo reset my pace completely. Not a single plastic bottle or engine hum in four days.',
  },
  {
    id: 'hendrik-singapore',
    guestName: 'Hendrik & Maya Tan',
    roleAndOrigin: 'Family of Four, Singapore',
    stayUnit: 'Pendopo Jati Heritage Joglo · 3 Nights',
    beforeContext: 'Looked for an authentic rural stay without sacrificing comfort for young kids.',
    outcomeQuote:
      'Ibu Sari let our children pick purple sweet potatoes and harvest chilies before dinner. The WhatsApp concierge handled our Semarang train pickup effortlessly.',
  },
];

export const VILLAGE_SEASONS: VillageSeason[] = [
  {
    id: 'dry-mist',
    months: 'May – September',
    name: 'Crisp Dry Mist & Cherry Harvest',
    tempRange: '13°C – 22°C',
    harvestFocus: 'Peak red arabica cherry picking & sun-drying on bamboo beds',
    trailCondition: 'Firm volcanic paths, clear sunrise volcano views',
  },
  {
    id: 'blossom-transition',
    months: 'October – December',
    name: 'Coffee Blossom & First Rains',
    tempRange: '15°C – 23°C',
    harvestFocus: 'Jasmine-scented white coffee flowers & wildflower honey gathering',
    trailCondition: 'Clear mornings until 14:00 WIB, lush emerald valleys',
  },
  {
    id: 'emerald-spring',
    months: 'January – April',
    name: 'Cloud-Forest Emerald Season',
    tempRange: '16°C – 22°C',
    harvestFocus: 'Heirloom highland root harvests, bamboo shoot foraging & indoor hearth craft',
    trailCondition: 'Misty canopy trails, abundant watershed waterfalls',
  },
];

export const VILLAGE_RHYTHM = [
  {
    time: '05:30 WIB',
    title: 'Dawn Ridge Coffee & Mist Walk',
    detail: 'Lantern-lit departure along terraced slopes as morning fog lifts over Mount Sindoro.',
  },
  {
    time: '08:00 WIB',
    title: 'Veranda Mountain Breakfast',
    detail: 'Warm rice porridge, organic duck eggs, roasted single-origin coffee, and garden fruit.',
  },
  {
    time: '10:30 WIB',
    title: 'Artisan Bamboo & Indigo Pavilion',
    detail: 'Unhurried hands-on craft sessions led by village elders under shaded open eaves.',
  },
  {
    time: '15:30 WIB',
    title: 'Silent Reading & Rain-Mist Tea Hour',
    detail: 'Spiced ginger infusions and steamed cassava served directly to your bamboo deck.',
  },
  {
    time: '18:00 WIB',
    title: 'Wood-Fired Village Hearth Supper',
    detail: 'Communal or private candlelit tasting menu cooked from that afternoon’s garden harvest.',
  },
];

export const CONCIERGE_PRESETS = [
  {
    id: 'weather',
    label: 'Morning trail weather?',
    reply:
      'Selamat pagi from Lereng Asri! Morning ridge visibility is clear today (15°C at 06:00 WIB). We provide woven rain capes and bamboo walking staffs at the pavilion.',
  },
  {
    id: 'dietary',
    label: 'Plant-based hearth menu?',
    reply:
      'Yes, Ibu Sari’s wood-fired kitchen prepares 100% plant-based Central Javanese highland menus using freshly harvested tempe, mountain greens, and heirloom tubers.',
  },
  {
    id: 'transfer',
    label: 'Train & airport shuttle?',
    reply:
      'We arrange private hybrid village transfers from Yogyakarta (YIA, 2h 15m) or Semarang Tawang Station (2h 30m) straight to our eco-village arrival gate.',
  },
];

export function formatCurrency(amountIdr: number, currency: CurrencyCode): string {
  if (currency === 'USD') {
    const usd = Math.round(amountIdr / 15800);
    return `$${usd.toLocaleString('en-US')}`;
  }
  return `IDR ${amountIdr.toLocaleString('id-ID')}`;
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return 2;
  }
  const diffMs = end.getTime() - start.getTime();
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(30, days));
}

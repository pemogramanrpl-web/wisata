import { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  Check,
  Info,
  MapPin,
  Minus,
  Plus,
  Star,
  Users,
  X,
} from 'lucide-react';
import {
  EXPERIENCES,
  GUEST_STORIES,
  HOMESTAYS,
  IMAGES,
  STEWARDSHIP_METRICS,
  VILLAGE_NOTICE,
  calculateNights,
  formatCurrency,
  type CurrencyCode,
  type Homestay,
  type HomestayCategory,
  type ScreenKey,
} from '../data/sanctuaryData';
import { ResilientImage } from './ResilientImage';

interface OverviewScreenProps {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  checkIn: string;
  checkOut: string;
  guests: number;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onGuestsChange: (val: number) => void;
  selectedExperienceIds: string[];
  onToggleExperience: (id: string) => void;
  onInspectHomestay: (homestay: Homestay) => void;
  onReserveHomestay: (homestay: Homestay) => void;
  onNavigate: (screen: ScreenKey) => void;
}

const STAY_CATEGORIES: HomestayCategory[] = [
  'All',
  'Bamboo Villa',
  'Heritage Joglo',
  'Canopy Loft',
];

export function OverviewScreen({
  currency,
  onCurrencyChange,
  checkIn,
  checkOut,
  guests,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  selectedExperienceIds,
  onToggleExperience,
  onInspectHomestay,
  onReserveHomestay,
  onNavigate,
}: OverviewScreenProps) {
  const [noticeDismissed, setNoticeDismissed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<HomestayCategory>('All');

  const nights = calculateNights(checkIn, checkOut);

  const filteredHomestays = HOMESTAYS.filter((stay) => {
    const categoryMatch = activeCategory === 'All' || stay.category === activeCategory;
    return categoryMatch;
  });

  const featuredExperience = EXPERIENCES[0];
  const secondaryExperiences = EXPERIENCES.slice(1, 3);

  return (
    <div className="space-y-14 pb-20">
      {/* Village Notice Banner */}
      {!noticeDismissed && (
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-5">
          <div
            role="status"
            className="flex items-start sm:items-center justify-between gap-4 px-5 py-3.5 rounded-2xl bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"
          >
            <div className="flex items-start sm:items-center gap-3 text-sm leading-relaxed">
              <Info className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0 text-[#D97706]" aria-hidden="true" />
              <p>
                <span className="font-semibold">{VILLAGE_NOTICE.seasonTag}</span>
                <span className="mx-2 opacity-60" aria-hidden="true">·</span>
                <span>{VILLAGE_NOTICE.message}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setNoticeDismissed(true)}
              aria-label="Dismiss seasonal notice"
              className="p-1.5 rounded-full hover:bg-[#92400E]/10 text-[#92400E] shrink-0 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className={`max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 ${noticeDismissed ? 'pt-6' : ''}`}>
        <div className="relative overflow-hidden rounded-3xl shadow-[0_12px_28px_-4px_rgba(30,77,43,0.10)] border border-[#1E4D2B]/10">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/8.2] w-full">
            <ResilientImage
              src={IMAGES.heroSanctuary}
              alt="Terraced bamboo cottages overlooking misty Indonesian highland coffee slopes at sunrise"
              className="w-full h-full object-cover"
              fallbackLabel="Lereng Asri Highland Terraces"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#023616]/90 via-[#023616]/45 to-[#023616]/15"
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8 text-white">
            <div className="max-w-2xl space-y-4">
              <p className="font-label-tech text-xs sm:text-[13px] tracking-wider text-[#BBF0C4]">
                Mount Sindoro Highlands · 1,350m Elevation · Central Java
              </p>
              <h1 className="text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px] lg:text-[52px] lg:leading-[60px] font-extrabold tracking-[-0.03em] text-balance">
                Restorative bamboo living above the morning mist.
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-[#E7F4EA] max-w-xl">
                An intimate Indonesian highland eco-village of four handcrafted sanctuaries, shade-grown arabica trails, and wood-fired village hospitality.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('stays')}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-full bg-white text-[#023616] hover:bg-[#F3FAF4] text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
              >
                <span>Explore Homestays</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('reserve')}
                className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-full border border-white/50 bg-[#023616]/40 hover:bg-[#023616]/65 text-white text-sm font-semibold whitespace-nowrap shrink-0 backdrop-blur-sm transition-colors cursor-pointer"
              >
                Plan Village Stay
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Availability Strip */}
        <div className="mt-5 bg-white rounded-3xl border border-[#1E4D2B]/10 shadow-[0_4px_20px_-2px_rgba(30,77,43,0.05)] p-5 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label
                htmlFor="hero-checkin"
                className="block text-xs font-label-tech text-[#414941] mb-1.5"
              >
                Check-in Date
              </label>
              <div className="relative">
                <Calendar
                  className="w-4 h-4 text-[#1E4D2B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="hero-checkin"
                  type="date"
                  value={checkIn}
                  onChange={(e) => onCheckInChange(e.target.value)}
                  className="eco-input w-full pl-11 pr-4 text-sm font-medium text-[#121C2C] tabular-nums"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="hero-checkout"
                className="block text-xs font-label-tech text-[#414941] mb-1.5"
              >
                Check-out Date ({nights} {nights === 1 ? 'Night' : 'Nights'})
              </label>
              <div className="relative">
                <Calendar
                  className="w-4 h-4 text-[#1E4D2B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="hero-checkout"
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => onCheckOutChange(e.target.value)}
                  className="eco-input w-full pl-11 pr-4 text-sm font-medium text-[#121C2C] tabular-nums"
                />
              </div>
            </div>

            <div>
              <span className="block text-xs font-label-tech text-[#414941] mb-1.5">
                Guests
              </span>
              <div className="eco-input px-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-[#121C2C]">
                  <Users className="w-4 h-4 text-[#1E4D2B]" aria-hidden="true" />
                  <span className="tabular-nums">
                    {guests} {guests === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Decrease guests"
                    onClick={() => onGuestsChange(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-[#1E4D2B]/20 flex items-center justify-center text-[#1E4D2B] hover:bg-[#F3FAF4] cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Increase guests"
                    onClick={() => onGuestsChange(Math.min(6, guests + 1))}
                    className="w-8 h-8 rounded-full border border-[#1E4D2B]/20 flex items-center justify-center text-[#1E4D2B] hover:bg-[#F3FAF4] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('stays')}
              className="w-full min-h-[52px] px-6 rounded-full bg-[#1E4D2B] hover:bg-[#023616] text-white text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer"
            >
              Check Sanctuary Availability
            </button>
          </div>
        </div>
      </section>

      {/* Signature Homestays Section */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <p className="font-label-tech text-xs tracking-wider text-[#2E7D32]">
              01. Highland Accommodations
            </p>
            <h2 className="text-[28px] leading-[36px] sm:text-[38px] sm:leading-[46px] font-bold tracking-[-0.02em] text-[#121C2C] text-balance">
              Handcrafted sanctuaries nestled on the ridge.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Interactive Filter Tabs */}
            <div
              role="group"
              aria-label="Filter homestays by architecture"
              className="flex flex-wrap items-center gap-2"
            >
              {STAY_CATEGORIES.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`min-h-[40px] px-4 rounded-full text-xs font-label-tech whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#1E4D2B] text-white'
                        : 'bg-white text-[#2D3748] border border-[#2D3748]/12 hover:border-[#1E4D2B]/40'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Currency Switch */}
            <div
              role="group"
              aria-label="Currency selector"
              className="inline-flex items-center p-1 rounded-full bg-white border border-[#1E4D2B]/15"
            >
              {(['IDR', 'USD'] as CurrencyCode[]).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => onCurrencyChange(code)}
                  className={`px-3 py-1.5 rounded-full text-xs font-label-tech transition-colors cursor-pointer ${
                    currency === code
                      ? 'bg-[#1E4D2B] text-white'
                      : 'text-[#2D3748] hover:text-[#1E4D2B]'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredHomestays.map((stay) => {
            const fitsGuests = stay.maxGuests >= guests;
            return (
              <article
                key={stay.id}
                className="bg-white rounded-3xl border border-[#1E4D2B]/10 shadow-[0_4px_20px_-2px_rgba(30,77,43,0.05)] hover:shadow-[0_12px_28px_-4px_rgba(30,77,43,0.10)] transition-shadow duration-200 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <ResilientImage
                    src={stay.image}
                    alt={`${stay.name} — ${stay.category} at Lereng Asri`}
                    className={`w-full h-full object-cover ${stay.imageFocusClass || ''}`}
                    fallbackLabel={stay.name}
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div className="space-y-3">
                    {/* Clean unboxed metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-label-tech text-[#414941]">
                      <span>
                        {stay.category} · {stay.elevationMeters.toLocaleString('en-US')}m ASL · Max {stay.maxGuests} Guests
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#121C2C] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" aria-hidden="true" />
                        <span className="tabular-nums">{stay.rating.toFixed(2)}</span>
                        <span className="text-[#414941] font-normal">({stay.reviewCount})</span>
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-[#121C2C]">
                      {stay.name}
                    </h3>

                    <p className="text-[15px] leading-relaxed text-[#2D3748]">
                      {stay.summary}
                    </p>

                    {!fitsGuests && (
                      <p className="text-xs font-medium text-[#92400E]">
                        Fits up to {stay.maxGuests} guests (your filter currently selects {guests} guests).
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#1E4D2B]/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="block text-xs font-label-tech text-[#414941]">
                        Nightly Sanctuary Rate
                      </span>
                      <span className="text-xl font-bold text-[#023616] tabular-nums">
                        {formatCurrency(stay.pricePerNightIdr, currency)}
                      </span>
                      <span className="text-sm text-[#414941]"> / night</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onInspectHomestay(stay)}
                        className="min-h-[44px] px-4 rounded-full border-[1.5px] border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#F3FAF4] text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => onReserveHomestay(stay)}
                        className="min-h-[44px] px-5 rounded-full bg-[#1E4D2B] hover:bg-[#023616] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Highland Experiences & Agro-Workshops Bento Section */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <p className="font-label-tech text-xs tracking-wider text-[#2E7D32]">
              02. Guided Village Life
            </p>
            <h2 className="text-[28px] leading-[36px] sm:text-[38px] sm:leading-[46px] font-bold tracking-[-0.02em] text-[#121C2C] text-balance">
              Walk the coffee terraces and gather at the wood hearth.
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('experiences')}
            className="inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full border-[1.5px] border-[#1E4D2B] text-[#1E4D2B] hover:bg-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Trail Guides</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Featured 2-col card */}
          {featuredExperience && (
            <article className="lg:col-span-2 bg-white rounded-3xl border border-[#1E4D2B]/10 shadow-[0_4px_20px_-2px_rgba(30,77,43,0.05)] overflow-hidden grid grid-cols-1 md:grid-cols-2 items-stretch">
              <div className="aspect-[4/3] md:aspect-auto w-full h-full overflow-hidden">
                <ResilientImage
                  src={featuredExperience.image}
                  alt={featuredExperience.name}
                  className="w-full h-full object-cover"
                  fallbackLabel={featuredExperience.name}
                />
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <p className="text-xs font-label-tech text-[#2E7D32]">
                    {featuredExperience.category} · {featuredExperience.scheduleWib} · {featuredExperience.durationLabel}
                    {featuredExperience.trailDistanceKm ? ` · ${featuredExperience.trailDistanceKm} km` : ''}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight text-[#121C2C]">
                    {featuredExperience.name}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#2D3748]">
                    {featuredExperience.summary}
                  </p>
                  <p className="text-xs text-[#414941]">
                    Hosted by <span className="font-semibold text-[#121C2C]">{featuredExperience.hostName}</span> · {featuredExperience.hostRole}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1E4D2B]/10 flex items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs font-label-tech text-[#414941]">Per Guest</span>
                    <span className="text-lg font-bold text-[#023616] tabular-nums">
                      {formatCurrency(featuredExperience.pricePerGuestIdr, currency)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleExperience(featuredExperience.id)}
                    className={`inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      selectedExperienceIds.includes(featuredExperience.id)
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-[#1E4D2B] hover:bg-[#023616] text-white'
                    }`}
                  >
                    {selectedExperienceIds.includes(featuredExperience.id) ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>In Stay Plan</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span>Add to Stay</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          )}

          {/* Secondary stacked experience column */}
          <div className="flex flex-col gap-6">
            {secondaryExperiences.map((exp) => {
              const added = selectedExperienceIds.includes(exp.id);
              return (
                <article
                  key={exp.id}
                  className="bg-white rounded-3xl border border-[#1E4D2B]/10 shadow-[0_4px_20px_-2px_rgba(30,77,43,0.05)] p-6 flex-1 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2.5">
                    <p className="text-xs font-label-tech text-[#414941]">
                      {exp.category} · {exp.scheduleWib} · {exp.durationLabel}
                    </p>
                    <h3 className="text-xl font-bold tracking-tight text-[#121C2C]">
                      {exp.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#2D3748]">
                      {exp.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1E4D2B]/10 flex items-center justify-between gap-3">
                    <span className="text-base font-bold text-[#023616] tabular-nums">
                      {formatCurrency(exp.pricePerGuestIdr, currency)}
                      <span className="text-xs font-normal text-[#414941]"> / guest</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => onToggleExperience(exp.id)}
                      className={`inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                        added
                          ? 'bg-[#2E7D32] text-white'
                          : 'border-[1.5px] border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#F3FAF4]'
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Add to Stay</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Claim-to-Proof Ecological Stewardship & Guest Voices */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 space-y-10">
        <div className="space-y-2 max-w-2xl">
          <p className="font-label-tech text-xs tracking-wider text-[#2E7D32]">
            03. Ecological Stewardship
          </p>
          <h2 className="text-[28px] leading-[36px] sm:text-[38px] sm:leading-[46px] font-bold tracking-[-0.02em] text-[#121C2C] text-balance">
            Built with village craft and measured watershed care.
          </h2>
        </div>

        {/* 4-column proof metrics strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEWARDSHIP_METRICS.map((metric) => (
            <div
              key={metric.id}
              className="bg-white rounded-2xl border border-[#1E4D2B]/10 p-6 space-y-2"
            >
              <p className="text-3xl font-extrabold text-[#023616] tracking-tight tabular-nums">
                {metric.value}
              </p>
              <p className="text-sm font-bold text-[#121C2C]">{metric.label}</p>
              <p className="text-xs leading-relaxed text-[#414941]">{metric.context}</p>
            </div>
          ))}
        </div>

        {/* Attributable Guest Stories adjacent to stewardship claims */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {GUEST_STORIES.map((story) => (
            <blockquote
              key={story.id}
              className="bg-white rounded-3xl border border-[#1E4D2B]/10 shadow-[0_4px_20px_-2px_rgba(30,77,43,0.05)] p-7 flex flex-col justify-between gap-5"
            >
              <div className="space-y-3">
                <p className="text-xs font-label-tech text-[#414941]">
                  {story.stayUnit}
                </p>
                <p className="text-base leading-relaxed text-[#121C2C]">
                  “{story.outcomeQuote}”
                </p>
              </div>
              <footer className="pt-4 border-t border-[#1E4D2B]/10 flex flex-wrap items-center justify-between gap-2 text-sm">
                <div>
                  <span className="font-bold text-[#121C2C]">{story.guestName}</span>
                  <span className="mx-2 text-[#414941]" aria-hidden="true">·</span>
                  <span className="text-[#414941]">{story.roleAndOrigin}</span>
                </div>
                <span className="text-xs text-[#2E7D32] font-medium">
                  {story.beforeContext}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Final Conversion Block */}
      <section className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="bg-[#1E4D2B] rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <p className="font-label-tech text-xs tracking-wider text-[#A0D3A6] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Desa Lereng Asri, Wonosobo · Central Java</span>
            </p>
            <h2 className="text-[28px] leading-[36px] sm:text-[34px] sm:leading-[42px] font-bold tracking-tight text-balance">
              Ready for unhurried highland mornings?
            </h2>
            <p className="text-base text-[#E7F4EA] leading-relaxed">
              Reserve your bamboo villa or heritage joglo directly with our village cooperative, or message our concierge on WhatsApp for custom family itineraries.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('reserve')}
              className="min-h-[48px] px-7 rounded-full bg-white text-[#023616] hover:bg-[#F3FAF4] text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer"
            >
              Reserve Your Sanctuary
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { ArrowLeft, Check, Compass, Leaf, Star, Users } from 'lucide-react';
import {
  HOMESTAYS,
  calculateNights,
  formatCurrency,
  type CurrencyCode,
  type Homestay,
  type HomestayCategory,
} from '../data/sanctuaryData';
import { ResilientImage } from './ResilientImage';

interface HomestaysScreenProps {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  checkIn: string;
  checkOut: string;
  guests: number;
  inspectedHomestay: Homestay | null;
  onInspectHomestay: (stay: Homestay | null) => void;
  onReserveHomestay: (stay: Homestay) => void;
}

const CATEGORIES: HomestayCategory[] = [
  'All',
  'Bamboo Villa',
  'Heritage Joglo',
  'Canopy Loft',
];

export function HomestaysScreen({
  currency,
  onCurrencyChange,
  checkIn,
  checkOut,
  guests,
  inspectedHomestay,
  onInspectHomestay,
  onReserveHomestay,
}: HomestaysScreenProps) {
  const [category, setCategory] = useState<HomestayCategory>('All');
  const [onlyFitGuests, setOnlyFitGuests] = useState(false);

  const nights = calculateNights(checkIn, checkOut);

  const visibleStays = HOMESTAYS.filter((stay) => {
    const catOk = category === 'All' || stay.category === category;
    const capOk = !onlyFitGuests || stay.maxGuests >= guests;
    return catOk && capOk;
  });

  if (inspectedHomestay) {
    const stayTotal = inspectedHomestay.pricePerNightIdr * nights;
    return (
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-8 pb-20 space-y-8">
        <button
          type="button"
          onClick={() => onInspectHomestay(null)}
          className="inline-flex items-center gap-2 min-h-[44px] px-4 rounded-full bg-white border border-[#1E4D2B]/15 text-sm font-semibold text-[#1E4D2B] hover:bg-[#1E4D2B]/5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to All Homestays</span>
        </button>

        {/* Detailed 2-Column Sanctuary View */}
        <div className="bg-white rounded-3xl border border-[#1E4D2B]/10 shadow-[0_4px_20px_-2px_rgba(30,77,43,0.05)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 aspect-[4/3] lg:aspect-auto min-h-[340px]">
            <ResilientImage
              src={inspectedHomestay.image}
              alt={inspectedHomestay.name}
              className={`w-full h-full object-cover ${inspectedHomestay.imageFocusClass || ''}`}
              fallbackLabel={inspectedHomestay.name}
            />
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-label-tech text-[#414941]">
                <span>
                  {inspectedHomestay.category} · {inspectedHomestay.elevationMeters}m ASL · {inspectedHomestay.areaSqm} sqm
                </span>
                <span className="inline-flex items-center gap-1 text-[#121C2C] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" aria-hidden="true" />
                  <span className="tabular-nums">{inspectedHomestay.rating.toFixed(2)}</span>
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-[#121C2C]">
                {inspectedHomestay.name}
              </h1>

              <p className="text-base leading-relaxed text-[#2D3748]">
                {inspectedHomestay.summary}
              </p>

              <div className="pt-4 border-t border-[#1E4D2B]/10 space-y-2">
                <p className="text-xs font-label-tech text-[#2E7D32] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Architectural Craft</span>
                </p>
                <p className="text-sm leading-relaxed text-[#2D3748]">
                  {inspectedHomestay.architecturalNote}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2.5">
                  <h2 className="text-xs font-label-tech text-[#414941]">Sanctuary Amenities</h2>
                  <ul className="space-y-2 text-sm text-[#2D3748]">
                    {inspectedHomestay.amenities.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <h2 className="text-xs font-label-tech text-[#414941]">Ecological Design</h2>
                  <ul className="space-y-2 text-sm text-[#2D3748]">
                    {inspectedHomestay.sustainabilityHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Leaf className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#1E4D2B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-label-tech text-[#414941] tabular-nums">
                  {nights} {nights === 1 ? 'Night' : 'Nights'} Estimate · {inspectedHomestay.bedrooms} {inspectedHomestay.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'} · Up to {inspectedHomestay.maxGuests} Guests
                </p>
                <p className="text-2xl font-extrabold text-[#023616] tabular-nums mt-0.5">
                  {formatCurrency(stayTotal, currency)}
                  <span className="text-sm font-normal text-[#414941]"> total stay</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => onReserveHomestay(inspectedHomestay)}
                className="min-h-[48px] px-7 rounded-full bg-[#1E4D2B] hover:bg-[#023616] text-white text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer"
              >
                Reserve This Sanctuary
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-10 pb-20 space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <p className="font-label-tech text-xs tracking-wider text-[#2E7D32]">
            Lereng Asri Sanctuaries
          </p>
          <h1 className="text-[36px] leading-[44px] font-extrabold tracking-tight text-[#121C2C] text-balance">
            Four private eco-residences shaped by bamboo, teak, and mist.
          </h1>
          <p className="text-base text-[#2D3748] leading-relaxed">
            Every stay includes morning mountain breakfast, pure spring water refills, and direct access to village terrace footpaths.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOnlyFitGuests((prev) => !prev)}
            className={`inline-flex items-center gap-2 min-h-[42px] px-4 rounded-full text-xs font-label-tech transition-colors cursor-pointer ${
              onlyFitGuests
                ? 'bg-[#2E7D32] text-white'
                : 'bg-white border border-[#1E4D2B]/20 text-[#2D3748]'
            }`}
          >
            <Users className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Fits {guests}+ Guests</span>
          </button>

          <div className="inline-flex items-center p-1 rounded-full bg-white border border-[#1E4D2B]/15">
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

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center gap-2.5">
        {CATEGORIES.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`min-h-[42px] px-5 rounded-full text-xs font-label-tech whitespace-nowrap transition-colors cursor-pointer ${
                active
                  ? 'bg-[#1E4D2B] text-white'
                  : 'bg-white text-[#2D3748] border border-[#2D3748]/12 hover:border-[#1E4D2B]/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results List */}
      {visibleStays.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#1E4D2B]/10 p-10 text-center space-y-4">
          <p className="text-lg font-bold text-[#121C2C]">
            No single residence matches that filter combination.
          </p>
          <p className="text-sm text-[#414941]">
            Try resetting the guest capacity filter or selecting All sanctuary architectures.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory('All');
              setOnlyFitGuests(false);
            }}
            className="min-h-[44px] px-6 rounded-full bg-[#1E4D2B] text-white text-sm font-semibold cursor-pointer"
          >
            Show All Sanctuaries
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {visibleStays.map((stay) => {
            const stayTotal = stay.pricePerNightIdr * nights;
            return (
              <article
                key={stay.id}
                className="bg-white rounded-3xl border border-[#1E4D2B]/10 shadow-[0_4px_20px_-2px_rgba(30,77,43,0.05)] overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ResilientImage
                    src={stay.image}
                    alt={stay.name}
                    className={`w-full h-full object-cover ${stay.imageFocusClass || ''}`}
                    fallbackLabel={stay.name}
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-label-tech text-[#414941]">
                      <span>
                        {stay.category} · {stay.bedrooms} BR · {stay.areaSqm} sqm · Max {stay.maxGuests} Guests
                      </span>
                      <span className="inline-flex items-center gap-1 text-[#121C2C] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" aria-hidden="true" />
                        <span className="tabular-nums">{stay.rating.toFixed(2)}</span>
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-[#121C2C]">
                      {stay.name}
                    </h2>

                    <p className="text-[15px] leading-relaxed text-[#2D3748]">
                      {stay.summary}
                    </p>

                    <div className="pt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#2E7D32] font-medium">
                      {stay.sustainabilityHighlights.slice(0, 2).map((item) => (
                        <span key={item} className="inline-flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1E4D2B]/10 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="block text-xs font-label-tech text-[#414941] tabular-nums">
                        {formatCurrency(stay.pricePerNightIdr, currency)} / night · {nights}N est.
                      </span>
                      <span className="text-xl font-bold text-[#023616] tabular-nums">
                        {formatCurrency(stayTotal, currency)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => onInspectHomestay(stay)}
                        className="min-h-[44px] px-4 rounded-full border-[1.5px] border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#F3FAF4] text-sm font-semibold whitespace-nowrap cursor-pointer"
                      >
                        Explore Details
                      </button>
                      <button
                        type="button"
                        onClick={() => onReserveHomestay(stay)}
                        className="min-h-[44px] px-5 rounded-full bg-[#1E4D2B] hover:bg-[#023616] text-white text-sm font-semibold whitespace-nowrap cursor-pointer"
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
      )}
    </div>
  );
}

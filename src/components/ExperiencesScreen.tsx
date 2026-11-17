import { useState } from 'react';
import { ArrowRight, Check, Clock, Compass, Plus } from 'lucide-react';
import {
  EXPERIENCES,
  VILLAGE_RHYTHM,
  formatCurrency,
  type CurrencyCode,
  type ExperienceCategory,
  type ScreenKey,
} from '../data/sanctuaryData';
import { ResilientImage } from './ResilientImage';

interface ExperiencesScreenProps {
  currency: CurrencyCode;
  selectedExperienceIds: string[];
  onToggleExperience: (id: string) => void;
  onNavigate: (screen: ScreenKey) => void;
}

const EXP_CATEGORIES: ExperienceCategory[] = [
  'All',
  'Agro-Walk',
  'Culinary',
  'Craft',
  'Trail',
];

export function ExperiencesScreen({
  currency,
  selectedExperienceIds,
  onToggleExperience,
  onNavigate,
}: ExperiencesScreenProps) {
  const [category, setCategory] = useState<ExperienceCategory>('All');

  const filteredExperiences = EXPERIENCES.filter(
    (exp) => category === 'All' || exp.category === category,
  );

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-10 pb-20 space-y-14">
      {/* Header & Filter */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <p className="font-label-tech text-xs tracking-wider text-[#2E7D32]">
            Guided Highland Experiences
          </p>
          <h1 className="text-[36px] leading-[44px] font-extrabold tracking-tight text-[#121C2C] text-balance">
            Agro-walks, indigo vats, and wood-fired village suppers.
          </h1>
          <p className="text-base text-[#2D3748] leading-relaxed">
            Every workshop is led by Lereng Asri farmers, hearth cooks, and bamboo artisans. Add experiences directly to your stay itinerary.
          </p>
        </div>

        {selectedExperienceIds.length > 0 && (
          <button
            type="button"
            onClick={() => onNavigate('reserve')}
            className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full bg-[#1E4D2B] hover:bg-[#023616] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer self-start lg:self-auto"
          >
            <span>Proceed with {selectedExperienceIds.length} Selected</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-2.5">
        {EXP_CATEGORIES.map((cat) => {
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

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredExperiences.map((exp) => {
          const added = selectedExperienceIds.includes(exp.id);
          return (
            <article
              key={exp.id}
              className="bg-white rounded-3xl border border-[#1E4D2B]/10 shadow-[0_4px_20px_-2px_rgba(30,77,43,0.05)] overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <ResilientImage
                  src={exp.image}
                  alt={exp.name}
                  className="w-full h-full object-cover"
                  fallbackLabel={exp.name}
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-label-tech text-[#414941]">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#2E7D32]" aria-hidden="true" />
                      {exp.category} · {exp.scheduleWib} · {exp.durationLabel}
                    </span>
                    {exp.trailDistanceKm && (
                      <span className="inline-flex items-center gap-1 text-[#1E4D2B]">
                        <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                        {exp.trailDistanceKm} km · +{exp.elevationGainM}m
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-[#121C2C]">
                    {exp.name}
                  </h2>

                  <p className="text-[15px] leading-relaxed text-[#2D3748]">
                    {exp.summary}
                  </p>

                  <ul className="space-y-1.5 pt-1 text-sm text-[#414941]">
                    {exp.includedItems.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#2E7D32] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#1E4D2B]/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs text-[#414941]">
                      Guided by <span className="font-semibold text-[#121C2C]">{exp.hostName}</span>
                    </span>
                    <span className="text-xl font-bold text-[#023616] tabular-nums">
                      {formatCurrency(exp.pricePerGuestIdr, currency)}
                    </span>
                    <span className="text-xs text-[#414941]"> / guest</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onToggleExperience(exp.id)}
                    className={`inline-flex items-center gap-2 min-h-[44px] px-5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      added
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-[#1E4D2B] hover:bg-[#023616] text-white'
                    }`}
                  >
                    {added ? (
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
          );
        })}
      </div>

      {/* Daily Village Rhythm */}
      <section className="bg-white rounded-3xl border border-[#1E4D2B]/10 p-6 sm:p-10 space-y-6">
        <div className="space-y-1.5 max-w-xl">
          <p className="font-label-tech text-xs tracking-wider text-[#2E7D32]">
            Daily Village Rhythm
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121C2C]">
            How a highland day unfolds at Lereng Asri.
          </h2>
        </div>

        <div className="divide-y divide-[#1E4D2B]/10">
          {VILLAGE_RHYTHM.map((slot) => (
            <div
              key={slot.time}
              className="py-4 first:pt-2 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline"
            >
              <span className="md:col-span-2 font-label-tech text-sm font-semibold text-[#1E4D2B] tabular-nums">
                {slot.time}
              </span>
              <span className="md:col-span-4 font-bold text-base text-[#121C2C]">
                {slot.title}
              </span>
              <p className="md:col-span-6 text-sm text-[#2D3748] leading-relaxed">
                {slot.detail}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

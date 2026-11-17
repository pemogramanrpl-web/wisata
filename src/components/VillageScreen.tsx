import { useState } from 'react';
import { CloudSun, Droplets, MapPin, Sprout } from 'lucide-react';
import {
  GUEST_STORIES,
  IMAGES,
  STEWARDSHIP_METRICS,
  VILLAGE_SEASONS,
  type ScreenKey,
} from '../data/sanctuaryData';
import { ResilientImage } from './ResilientImage';

interface VillageScreenProps {
  onNavigate: (screen: ScreenKey) => void;
}

export function VillageScreen({ onNavigate }: VillageScreenProps) {
  const [selectedSeasonId, setSelectedSeasonId] = useState(VILLAGE_SEASONS[0].id);
  const activeSeason =
    VILLAGE_SEASONS.find((s) => s.id === selectedSeasonId) || VILLAGE_SEASONS[0];

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-10 pb-20 space-y-14">
      {/* Editorial Village Intro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6 py-2">
          <div className="space-y-4">
            <p className="font-label-tech text-xs tracking-wider text-[#2E7D32]">
              Community Cooperative · Mount Sindoro
            </p>
            <h1 className="text-[36px] leading-[44px] sm:text-[44px] sm:leading-[52px] font-extrabold tracking-tight text-[#121C2C] text-balance">
              Hospitality owned and stewarded by 24 highland families.
            </h1>
            <p className="text-base leading-relaxed text-[#2D3748]">
              Lereng Asri began in 2019 when local coffee smallholders and bamboo builders set aside 18 hectares of sloping terrace land to restore shade canopy, protect mountain springs, and welcome travelers without concrete sprawl.
            </p>
            <p className="text-base leading-relaxed text-[#2D3748]">
              Motorized vehicles park at the lower village gate. Inside the sanctuary, pathways are volcanic cobble and swept earth, lit softly at dusk by warm amber lanterns.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('stays')}
              className="min-h-[48px] px-6 rounded-full bg-[#1E4D2B] hover:bg-[#023616] text-white text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer"
            >
              Browse Sanctuaries
            </button>
            <button
              type="button"
              onClick={() => onNavigate('experiences')}
              className="min-h-[48px] px-6 rounded-full border-[1.5px] border-[#1E4D2B] text-[#1E4D2B] hover:bg-white text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer"
            >
              Explore Agro-Workshops
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 rounded-3xl overflow-hidden border border-[#1E4D2B]/10 shadow-[0_4px_20px_-2px_rgba(30,77,43,0.05)] aspect-[4/3] lg:aspect-auto min-h-[340px]">
          <ResilientImage
            src={IMAGES.coffeeHarvest}
            alt="Lereng Asri coffee smallholder walking mist-wrapped arabica trails"
            className="w-full h-full object-cover"
            fallbackLabel="Lereng Asri Agroforestry"
          />
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
      </section>

      {/* Interactive Highland Seasonal Guide */}
      <section className="bg-white rounded-3xl border border-[#1E4D2B]/10 shadow-[0_4px_20px_-2px_rgba(30,77,43,0.05)] p-6 sm:p-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="font-label-tech text-xs tracking-wider text-[#2E7D32]">
              Seasonal Highland Calendar
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#121C2C]">
              When to visit Lereng Asri.
            </h2>
          </div>

          <div
            role="group"
            aria-label="Select highland season"
            className="flex flex-wrap gap-2"
          >
            {VILLAGE_SEASONS.map((season) => {
              const active = season.id === selectedSeasonId;
              return (
                <button
                  key={season.id}
                  type="button"
                  onClick={() => setSelectedSeasonId(season.id)}
                  className={`min-h-[40px] px-4 rounded-full text-xs font-label-tech whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#1E4D2B] text-white'
                      : 'bg-[#F3FAF4] text-[#2D3748] hover:bg-[#1E4D2B]/10'
                  }`}
                >
                  {season.months}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-[#1E4D2B]/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-xs font-label-tech text-[#414941] flex items-center gap-1.5">
              <CloudSun className="w-4 h-4 text-[#D97706]" aria-hidden="true" />
              <span>Season & Temperature</span>
            </p>
            <p className="text-lg font-bold text-[#121C2C]">{activeSeason.name}</p>
            <p className="text-sm font-label-tech text-[#1E4D2B] tabular-nums">
              {activeSeason.tempRange}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-label-tech text-[#414941] flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
              <span>Harvest & Craft Focus</span>
            </p>
            <p className="text-sm leading-relaxed text-[#2D3748]">
              {activeSeason.harvestFocus}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-label-tech text-[#414941] flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-[#2E7D32]" aria-hidden="true" />
              <span>Trail Conditions</span>
            </p>
            <p className="text-sm leading-relaxed text-[#2D3748]">
              {activeSeason.trailCondition}
            </p>
          </div>
        </div>
      </section>

      {/* Guest Stories & Access */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#121C2C]">
            Guest Reflections
          </h2>
          {GUEST_STORIES.map((story) => (
            <blockquote
              key={story.id}
              className="bg-white rounded-3xl border border-[#1E4D2B]/10 p-6 space-y-4"
            >
              <p className="text-xs font-label-tech text-[#414941]">{story.stayUnit}</p>
              <p className="text-base leading-relaxed text-[#121C2C]">
                “{story.outcomeQuote}”
              </p>
              <footer className="text-sm text-[#414941]">
                <span className="font-bold text-[#121C2C]">{story.guestName}</span> · {story.roleAndOrigin}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#1E4D2B]/10 p-7 space-y-5">
          <p className="font-label-tech text-xs tracking-wider text-[#2E7D32] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Reaching Desa Lereng Asri</span>
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-[#121C2C]">
            Quiet arrival in Central Java.
          </h2>
          <div className="space-y-4 text-sm text-[#2D3748] leading-relaxed">
            <div>
              <p className="font-semibold text-[#121C2C]">From Yogyakarta International Airport (YIA)</p>
              <p className="text-[#414941]">2 hours 15 minutes via scenic Purworejo–Wonosobo ridge road.</p>
            </div>
            <div>
              <p className="font-semibold text-[#121C2C]">From Semarang Tawang Rail Station</p>
              <p className="text-[#414941]">2 hours 30 minutes through Temanggung coffee valleys.</p>
            </div>
            <div>
              <p className="font-semibold text-[#121C2C]">Sanctuary Coordinates</p>
              <p className="font-label-tech text-xs text-[#1E4D2B] tabular-nums">
                7°19'42"S 109°58'14"E · 1,350m ASL
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('reserve')}
            className="w-full min-h-[48px] px-6 rounded-full bg-[#1E4D2B] hover:bg-[#023616] text-white text-sm font-semibold transition-colors cursor-pointer"
          >
            Arrange Stay & Village Transfer
          </button>
        </div>
      </section>
    </div>
  );
}

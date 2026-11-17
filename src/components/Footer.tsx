import type { ScreenKey } from '../data/sanctuaryData';

interface FooterProps {
  onNavigate: (screen: ScreenKey) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#1E4D2B]/12 bg-[#F3FAF4]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1.5">
          <p className="text-lg font-extrabold tracking-tight text-[#023616]">
            Lereng Asri Eco-Sanctuary
          </p>
          <p className="text-sm text-[#414941]">
            Desa Lereng Asri, Wonosobo, Central Java · 1,350m Elevation
          </p>
          <p className="text-xs font-label-tech text-[#414941]">
            Concierge: +62 811-2840-1350 · salam@lerengasri.id
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-sm font-medium text-[#2D3748]">
          <button
            type="button"
            onClick={() => onNavigate('overview')}
            className="hover:text-[#023616] transition-colors cursor-pointer"
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => onNavigate('stays')}
            className="hover:text-[#023616] transition-colors cursor-pointer"
          >
            Homestays
          </button>
          <button
            type="button"
            onClick={() => onNavigate('experiences')}
            className="hover:text-[#023616] transition-colors cursor-pointer"
          >
            Experiences
          </button>
          <button
            type="button"
            onClick={() => onNavigate('village')}
            className="hover:text-[#023616] transition-colors cursor-pointer"
          >
            Village
          </button>
          <button
            type="button"
            onClick={() => onNavigate('reserve')}
            className="hover:text-[#023616] transition-colors cursor-pointer"
          >
            Reserve Stay
          </button>
        </nav>
      </div>
    </footer>
  );
}

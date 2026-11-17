import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { ScreenKey } from '../data/sanctuaryData';

interface NavbarProps {
  activeScreen: ScreenKey;
  onNavigate: (screen: ScreenKey) => void;
  itineraryCount: number;
}

const NAV_ITEMS: { key: ScreenKey; label: string }[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'stays', label: 'Homestays' },
  { key: 'experiences', label: 'Experiences' },
  { key: 'village', label: 'Village' },
];

export function Navbar({ activeScreen, onNavigate, itineraryCount }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (screen: ScreenKey) => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F3FAF4]/95 backdrop-blur-md border-b border-[#1E4D2B]/10">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <button
          type="button"
          onClick={() => handleSelect('overview')}
          className="text-xl font-extrabold tracking-tight text-[#023616] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2E7D32] cursor-pointer"
        >
          Lereng Asri
        </button>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleSelect(item.key)}
                className={`relative py-1 text-[15px] font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2E7D32] ${
                  isActive
                    ? 'text-[#023616] font-semibold'
                    : 'text-[#2D3748] hover:text-[#1E4D2B]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#2E7D32] transition-opacity duration-150 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary CTA button + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect('reserve')}
            className="hidden sm:inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-[#1E4D2B] hover:bg-[#023616] text-white text-sm font-semibold tracking-wide whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E7D32]"
          >
            {itineraryCount > 0 ? `Reserve Stay (${itineraryCount})` : 'Reserve Stay'}
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#1E4D2B]/20 bg-white text-[#1E4D2B] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2E7D32]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#1E4D2B]/12 px-5 py-4 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => handleSelect(item.key)}
                className={`w-full text-left px-4 min-h-[44px] rounded-xl text-[15px] font-medium flex items-center justify-between transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#F3FAF4] text-[#023616] font-semibold'
                    : 'text-[#2D3748] hover:bg-[#F3FAF4]/60'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="text-xs font-label-tech text-[#2E7D32]">Active</span>
                )}
              </button>
            );
          })}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleSelect('reserve')}
              className="w-full min-h-[48px] px-6 rounded-full bg-[#1E4D2B] text-white text-sm font-semibold whitespace-nowrap cursor-pointer"
            >
              {itineraryCount > 0 ? `Reserve Stay (${itineraryCount})` : 'Reserve Stay'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ExperiencesScreen } from './components/ExperiencesScreen';
import { Footer } from './components/Footer';
import { HomestaysScreen } from './components/HomestaysScreen';
import { Navbar } from './components/Navbar';
import { OverviewScreen } from './components/OverviewScreen';
import { ReserveScreen } from './components/ReserveScreen';
import { VillageScreen } from './components/VillageScreen';
import { WhatsAppConciergeDrawer } from './components/WhatsAppConciergeDrawer';
import {
  HOMESTAYS,
  type CurrencyCode,
  type Homestay,
  type ScreenKey,
} from './data/sanctuaryData';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>('overview');
  const [currency, setCurrency] = useState<CurrencyCode>('IDR');
  const [checkIn, setCheckIn] = useState('2026-11-27');
  const [checkOut, setCheckOut] = useState('2026-11-29');
  const [guests, setGuests] = useState(2);
  const [selectedHomestayId, setSelectedHomestayId] = useState(HOMESTAYS[0].id);
  const [inspectedHomestay, setInspectedHomestay] = useState<Homestay | null>(null);
  const [selectedExperienceIds, setSelectedExperienceIds] = useState<string[]>([
    'sunrise-arabica-walk',
  ]);
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [conciergePrefill, setConciergePrefill] = useState('');

  const handleNavigate = (screen: ScreenKey) => {
    if (screen !== 'stays') {
      setInspectedHomestay(null);
    }
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckInChange = (val: string) => {
    setCheckIn(val);
    if (val >= checkOut) {
      const next = new Date(val);
      if (!Number.isNaN(next.getTime())) {
        next.setDate(next.getDate() + 2);
        setCheckOut(next.toISOString().slice(0, 10));
      }
    }
  };

  const handleToggleExperience = (id: string) => {
    setSelectedExperienceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleInspectHomestay = (stay: Homestay) => {
    setInspectedHomestay(stay);
    setActiveScreen('stays');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReserveHomestay = (stay: Homestay) => {
    setSelectedHomestayId(stay.id);
    setInspectedHomestay(null);
    setActiveScreen('reserve');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConcierge = (prefill = '') => {
    setConciergePrefill(prefill);
    setConciergeOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3FAF4] text-[#2D3748]">
      <Navbar
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        itineraryCount={selectedExperienceIds.length}
      />

      <main className="flex-1">
        {activeScreen === 'overview' && (
          <OverviewScreen
            currency={currency}
            onCurrencyChange={setCurrency}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            onCheckInChange={handleCheckInChange}
            onCheckOutChange={setCheckOut}
            onGuestsChange={setGuests}
            selectedExperienceIds={selectedExperienceIds}
            onToggleExperience={handleToggleExperience}
            onInspectHomestay={handleInspectHomestay}
            onReserveHomestay={handleReserveHomestay}
            onNavigate={handleNavigate}
          />
        )}

        {activeScreen === 'stays' && (
          <HomestaysScreen
            currency={currency}
            onCurrencyChange={setCurrency}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            inspectedHomestay={inspectedHomestay}
            onInspectHomestay={setInspectedHomestay}
            onReserveHomestay={handleReserveHomestay}
          />
        )}

        {activeScreen === 'experiences' && (
          <ExperiencesScreen
            currency={currency}
            selectedExperienceIds={selectedExperienceIds}
            onToggleExperience={handleToggleExperience}
            onNavigate={handleNavigate}
          />
        )}

        {activeScreen === 'village' && <VillageScreen onNavigate={handleNavigate} />}

        {activeScreen === 'reserve' && (
          <ReserveScreen
            currency={currency}
            onCurrencyChange={setCurrency}
            selectedHomestayId={selectedHomestayId}
            onSelectHomestayId={setSelectedHomestayId}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            onCheckInChange={handleCheckInChange}
            onCheckOutChange={setCheckOut}
            onGuestsChange={setGuests}
            selectedExperienceIds={selectedExperienceIds}
            onToggleExperience={handleToggleExperience}
            onOpenConcierge={handleOpenConcierge}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <WhatsAppConciergeDrawer
        isOpen={conciergeOpen}
        prefilledMessage={conciergePrefill}
        onOpen={() => handleOpenConcierge('')}
        onClose={() => setConciergeOpen(false)}
      />
    </div>
  );
}

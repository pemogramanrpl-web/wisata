import { useState, type FormEvent } from 'react';
import { CheckCircle2, MessageCircle, Minus, Plus } from 'lucide-react';
import {
  EXPERIENCES,
  HOMESTAYS,
  calculateNights,
  formatCurrency,
  type CurrencyCode,
} from '../data/sanctuaryData';

interface ReserveScreenProps {
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
  selectedHomestayId: string;
  onSelectHomestayId: (id: string) => void;
  checkIn: string;
  checkOut: string;
  guests: number;
  onCheckInChange: (val: string) => void;
  onCheckOutChange: (val: string) => void;
  onGuestsChange: (val: number) => void;
  selectedExperienceIds: string[];
  onToggleExperience: (id: string) => void;
  onOpenConcierge: (prefilledSummary: string) => void;
}

const SHUTTLE_FEE_IDR = 650000;
const CONSERVATION_CONTRIBUTION_IDR = 95000;

export function ReserveScreen({
  currency,
  onCurrencyChange,
  selectedHomestayId,
  onSelectHomestayId,
  checkIn,
  checkOut,
  guests,
  onCheckInChange,
  onCheckOutChange,
  onGuestsChange,
  selectedExperienceIds,
  onToggleExperience,
  onOpenConcierge,
}: ReserveScreenProps) {
  const [includeShuttle, setIncludeShuttle] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestWhatsApp, setGuestWhatsApp] = useState('');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [bookingReference, setBookingReference] = useState<string | null>(null);

  const selectedHomestay =
    HOMESTAYS.find((h) => h.id === selectedHomestayId) || HOMESTAYS[0];
  const nights = calculateNights(checkIn, checkOut);

  const staySubtotal = selectedHomestay.pricePerNightIdr * nights;
  const selectedExperiences = EXPERIENCES.filter((e) =>
    selectedExperienceIds.includes(e.id),
  );
  const experiencesSubtotal = selectedExperiences.reduce(
    (sum, exp) => sum + exp.pricePerGuestIdr * guests,
    0,
  );
  const shuttleSubtotal = includeShuttle ? SHUTTLE_FEE_IDR : 0;
  const grandTotalIdr =
    staySubtotal + experiencesSubtotal + shuttleSubtotal + CONSERVATION_CONTRIBUTION_IDR;

  const summaryMessage = `Halo Lereng Asri Concierge! I would like to reserve ${selectedHomestay.name} (${checkIn} to ${checkOut}, ${nights} nights, ${guests} guests)${
    selectedExperiences.length > 0
      ? ` with workshops: ${selectedExperiences.map((e) => e.name).join(', ')}`
      : ''
  }. Estimated total: ${formatCurrency(grandTotalIdr, currency)}.`;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (guestName.trim().length < 2) {
      setFormError('Please enter the primary guest full name.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(guestEmail.trim())) {
      setFormError('Please enter a valid email address for your confirmation pass.');
      return;
    }
    if (guestWhatsApp.trim().length < 7) {
      setFormError('Please provide a WhatsApp or mobile number for village arrival coordination.');
      return;
    }

    const code = `LA-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingReference(code);
  };

  if (bookingReference) {
    return (
      <div className="max-w-[780px] mx-auto px-5 md:px-8 py-12 pb-24">
        <div className="bg-white rounded-3xl border border-[#1E4D2B]/15 shadow-[0_12px_28px_-4px_rgba(30,77,43,0.10)] p-7 sm:p-10 space-y-7">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2E7D32]/12 text-[#2E7D32] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <p className="font-label-tech text-xs text-[#2E7D32]">
                Reservation Request Confirmed · Ref {bookingReference}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121C2C]">
                Sugeng rawuh, {guestName}. Your sanctuary hold is ready.
              </h1>
              <p className="text-sm text-[#414941]">
                A copy of this village itinerary has been prepared for {guestEmail} and our Wonosobo concierge host.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-[#F3FAF4] border border-[#1E4D2B]/10 p-6 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-[#414941]">Sanctuary</span>
              <span className="font-bold text-[#121C2C] text-right">{selectedHomestay.name}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#414941]">Dates & Duration</span>
              <span className="font-medium text-[#121C2C] tabular-nums text-right">
                {checkIn} → {checkOut} ({nights} {nights === 1 ? 'Night' : 'Nights'})
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#414941]">Party Size</span>
              <span className="font-medium text-[#121C2C] tabular-nums">{guests} Guests</span>
            </div>
            {selectedExperiences.length > 0 && (
              <div className="flex justify-between gap-4">
                <span className="text-[#414941]">Selected Workshops</span>
                <span className="font-medium text-[#121C2C] text-right">
                  {selectedExperiences.map((e) => e.name).join(', ')}
                </span>
              </div>
            )}
            <div className="pt-3 border-t border-[#1E4D2B]/10 flex justify-between gap-4 text-base">
              <span className="font-bold text-[#121C2C]">Total Sanctuary Estimate</span>
              <span className="font-extrabold text-[#023616] tabular-nums">
                {formatCurrency(grandTotalIdr, currency)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenConcierge(summaryMessage)}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Message WhatsApp Concierge</span>
            </button>
            <button
              type="button"
              onClick={() => setBookingReference(null)}
              className="min-h-[48px] px-6 rounded-full border-[1.5px] border-[#1E4D2B] text-[#1E4D2B] hover:bg-[#F3FAF4] text-sm font-semibold transition-colors cursor-pointer"
            >
              Modify Itinerary
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-10 pb-24 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <p className="font-label-tech text-xs tracking-wider text-[#2E7D32]">
            Direct Cooperative Booking
          </p>
          <h1 className="text-[34px] leading-[42px] font-extrabold tracking-tight text-[#121C2C]">
            Configure your Lereng Asri stay.
          </h1>
          <p className="text-base text-[#2D3748]">
            Zero platform commissions. 100% of workshop fees and stay revenues support our highland village cooperative.
          </p>
        </div>

        <div className="inline-flex items-center p-1 rounded-full bg-white border border-[#1E4D2B]/15 self-start sm:self-auto">
          {(['IDR', 'USD'] as CurrencyCode[]).map((code) => (
            <button
              key={code}
              type="button"
              onClick={() => onCurrencyChange(code)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-label-tech transition-colors cursor-pointer ${
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

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        {/* Left Column: Configurator */}
        <div className="lg:col-span-7 space-y-7">
          {/* 1. Sanctuary Selection */}
          <section className="bg-white rounded-3xl border border-[#1E4D2B]/10 p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-bold text-[#121C2C]">1. Select Sanctuary & Dates</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HOMESTAYS.map((stay) => {
                const selected = stay.id === selectedHomestay.id;
                return (
                  <button
                    key={stay.id}
                    type="button"
                    onClick={() => onSelectHomestayId(stay.id)}
                    className={`text-left p-4 rounded-2xl border transition-colors cursor-pointer ${
                      selected
                        ? 'border-[#2E7D32] bg-[#F3FAF4]'
                        : 'border-[#1E4D2B]/15 bg-white hover:border-[#1E4D2B]/40'
                    }`}
                  >
                    <p className="text-xs font-label-tech text-[#414941]">
                      {stay.category} · Max {stay.maxGuests} Guests
                    </p>
                    <p className="font-bold text-[#121C2C] mt-1">{stay.name}</p>
                    <p className="text-sm font-semibold text-[#1E4D2B] tabular-nums mt-1.5">
                      {formatCurrency(stay.pricePerNightIdr, currency)} / night
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label
                  htmlFor="res-checkin"
                  className="block text-xs font-label-tech text-[#414941] mb-1.5"
                >
                  Check-in
                </label>
                <input
                  id="res-checkin"
                  type="date"
                  value={checkIn}
                  onChange={(e) => onCheckInChange(e.target.value)}
                  className="eco-input w-full px-3.5 text-sm font-medium text-[#121C2C] tabular-nums"
                />
              </div>

              <div>
                <label
                  htmlFor="res-checkout"
                  className="block text-xs font-label-tech text-[#414941] mb-1.5"
                >
                  Check-out
                </label>
                <input
                  id="res-checkout"
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => onCheckOutChange(e.target.value)}
                  className="eco-input w-full px-3.5 text-sm font-medium text-[#121C2C] tabular-nums"
                />
              </div>

              <div>
                <span className="block text-xs font-label-tech text-[#414941] mb-1.5">
                  Guests
                </span>
                <div className="eco-input px-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#121C2C] tabular-nums">
                    {guests}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      aria-label="Decrease guests"
                      onClick={() => onGuestsChange(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-full border border-[#1E4D2B]/20 flex items-center justify-center text-[#1E4D2B] cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Increase guests"
                      onClick={() => onGuestsChange(Math.min(6, guests + 1))}
                      className="w-8 h-8 rounded-full border border-[#1E4D2B]/20 flex items-center justify-center text-[#1E4D2B] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Optional Village Experiences & Transfers */}
          <section className="bg-white rounded-3xl border border-[#1E4D2B]/10 p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-bold text-[#121C2C]">
              2. Highland Workshops & Arrival Transfer
            </h2>

            <div className="space-y-3">
              {EXPERIENCES.map((exp) => {
                const checked = selectedExperienceIds.includes(exp.id);
                return (
                  <label
                    key={exp.id}
                    className={`flex items-start justify-between gap-4 p-4 rounded-2xl border cursor-pointer transition-colors ${
                      checked
                        ? 'border-[#2E7D32] bg-[#F3FAF4]'
                        : 'border-[#1E4D2B]/12 hover:border-[#1E4D2B]/30'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleExperience(exp.id)}
                        className="eco-checkbox mt-0.5"
                      />
                      <div>
                        <p className="font-semibold text-sm text-[#121C2C]">{exp.name}</p>
                        <p className="text-xs font-label-tech text-[#414941] mt-0.5">
                          {exp.scheduleWib} · {exp.durationLabel} · Hosted by {exp.hostName}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-[#023616] tabular-nums whitespace-nowrap">
                      {formatCurrency(exp.pricePerGuestIdr * guests, currency)}
                    </span>
                  </label>
                );
              })}

              <label
                className={`flex items-start justify-between gap-4 p-4 rounded-2xl border cursor-pointer transition-colors ${
                  includeShuttle
                    ? 'border-[#2E7D32] bg-[#F3FAF4]'
                    : 'border-[#1E4D2B]/12 hover:border-[#1E4D2B]/30'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <input
                    type="checkbox"
                    checked={includeShuttle}
                    onChange={() => setIncludeShuttle((prev) => !prev)}
                    className="eco-checkbox mt-0.5"
                  />
                  <div>
                    <p className="font-semibold text-sm text-[#121C2C]">
                      Private Hybrid Transfer (YIA Airport or Semarang Tawang)
                    </p>
                    <p className="text-xs text-[#414941] mt-0.5">
                      One-way scenic mountain transfer directly to the village gate
                    </p>
                  </div>
                </div>
                <span className="text-sm font-bold text-[#023616] tabular-nums whitespace-nowrap">
                  {formatCurrency(SHUTTLE_FEE_IDR, currency)}
                </span>
              </label>
            </div>
          </section>

          {/* 3. Guest Contact Details */}
          <section className="bg-white rounded-3xl border border-[#1E4D2B]/10 p-6 sm:p-8 space-y-5">
            <h2 className="text-xl font-bold text-[#121C2C]">3. Primary Guest Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="guest-name"
                  className="block text-xs font-label-tech text-[#414941] mb-1.5"
                >
                  Full Name *
                </label>
                <input
                  id="guest-name"
                  type="text"
                  required
                  placeholder="e.g. Raka Pratama"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="eco-input w-full px-4 text-sm text-[#121C2C]"
                />
              </div>

              <div>
                <label
                  htmlFor="guest-email"
                  className="block text-xs font-label-tech text-[#414941] mb-1.5"
                >
                  Email Address *
                </label>
                <input
                  id="guest-email"
                  type="email"
                  required
                  placeholder="raka@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="eco-input w-full px-4 text-sm text-[#121C2C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="guest-whatsapp"
                  className="block text-xs font-label-tech text-[#414941] mb-1.5"
                >
                  WhatsApp Number *
                </label>
                <input
                  id="guest-whatsapp"
                  type="tel"
                  required
                  placeholder="+62 812 3456 7890"
                  value={guestWhatsApp}
                  onChange={(e) => setGuestWhatsApp(e.target.value)}
                  className="eco-input w-full px-4 text-sm text-[#121C2C] tabular-nums"
                />
              </div>

              <div>
                <label
                  htmlFor="guest-notes"
                  className="block text-xs font-label-tech text-[#414941] mb-1.5"
                >
                  Dietary or Arrival Notes
                </label>
                <input
                  id="guest-notes"
                  type="text"
                  placeholder="Plant-based dinner, early check-in..."
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  className="eco-input w-full px-4 text-sm text-[#121C2C]"
                />
              </div>
            </div>

            {formError && (
              <p
                role="alert"
                className="text-sm font-medium text-[#93000a] bg-[#ffdad6] px-4 py-3 rounded-xl"
              >
                {formError}
              </p>
            )}
          </section>
        </div>

        {/* Right Column: Live Itemized Summary */}
        <aside className="lg:col-span-5 bg-white rounded-3xl border border-[#1E4D2B]/15 shadow-[0_12px_28px_-4px_rgba(30,77,43,0.10)] p-6 sm:p-8 space-y-6 lg:sticky lg:top-24">
          <div className="space-y-1">
            <p className="font-label-tech text-xs text-[#2E7D32]">Stay Summary</p>
            <h2 className="text-2xl font-bold text-[#121C2C]">{selectedHomestay.name}</h2>
            <p className="text-xs font-label-tech text-[#414941] tabular-nums">
              {checkIn} → {checkOut} · {nights} {nights === 1 ? 'Night' : 'Nights'} · {guests} {guests === 1 ? 'Guest' : 'Guests'}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#1E4D2B]/10 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-[#2D3748] tabular-nums">
                Sanctuary ({nights} × {formatCurrency(selectedHomestay.pricePerNightIdr, currency)})
              </span>
              <span className="font-semibold text-[#121C2C] tabular-nums">
                {formatCurrency(staySubtotal, currency)}
              </span>
            </div>

            {selectedExperiences.map((exp) => (
              <div key={exp.id} className="flex justify-between gap-4">
                <span className="text-[#2D3748]">
                  {exp.name} ({guests}×)
                </span>
                <span className="font-semibold text-[#121C2C] tabular-nums">
                  {formatCurrency(exp.pricePerGuestIdr * guests, currency)}
                </span>
              </div>
            ))}

            {includeShuttle && (
              <div className="flex justify-between gap-4">
                <span className="text-[#2D3748]">Hybrid Station / Airport Transfer</span>
                <span className="font-semibold text-[#121C2C] tabular-nums">
                  {formatCurrency(SHUTTLE_FEE_IDR, currency)}
                </span>
              </div>
            )}

            <div className="flex justify-between gap-4">
              <span className="text-[#414941]">Watershed & Canopy Conservation</span>
              <span className="font-medium text-[#121C2C] tabular-nums">
                {formatCurrency(CONSERVATION_CONTRIBUTION_IDR, currency)}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E4D2B]/10 flex items-baseline justify-between gap-4">
            <span className="text-base font-bold text-[#121C2C]">Estimated Total</span>
            <span className="text-2xl font-extrabold text-[#023616] tabular-nums">
              {formatCurrency(grandTotalIdr, currency)}
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <button
              type="submit"
              className="w-full min-h-[52px] px-6 rounded-full bg-[#1E4D2B] hover:bg-[#023616] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Confirm Direct Village Reservation
            </button>

            <button
              type="button"
              onClick={() => onOpenConcierge(summaryMessage)}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Chat via WhatsApp Concierge</span>
            </button>
          </div>

          <p className="text-xs text-[#414941] leading-relaxed">
            No immediate card charge required. Our village host confirms availability and sends local transfer instructions within 2 hours.
          </p>
        </aside>
      </form>
    </div>
  );
}

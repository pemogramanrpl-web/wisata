---
name: Lereng Asri Eco-Sanctuary
colors:
  surface: '#f9f9ff'
  surface-dim: '#d0daf0'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d9e3f9'
  on-surface: '#121c2c'
  on-surface-variant: '#414941'
  inverse-surface: '#273141'
  inverse-on-surface: '#ebf1ff'
  outline: '#717970'
  outline-variant: '#c1c9be'
  surface-tint: '#396844'
  primary: '#023616'
  on-primary: '#ffffff'
  primary-container: '#1e4d2b'
  on-primary-container: '#8bbd92'
  inverse-primary: '#a0d3a6'
  secondary: '#1b6d24'
  on-secondary: '#ffffff'
  secondary-container: '#a0f399'
  on-secondary-container: '#217128'
  tertiary: '#4a2400'
  on-tertiary: '#ffffff'
  tertiary-container: '#6a3700'
  on-tertiary-container: '#ff9939'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bbefc1'
  primary-fixed-dim: '#a0d3a6'
  on-primary-fixed: '#00210b'
  on-primary-fixed-variant: '#21502e'
  secondary-fixed: '#a3f69c'
  secondary-fixed-dim: '#88d982'
  on-secondary-fixed: '#002204'
  on-secondary-fixed-variant: '#005312'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f9f9ff'
  on-background: '#121c2c'
  surface-variant: '#d9e3f9'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 52px
    fontWeight: '800'
    lineHeight: 60px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 38px
    fontWeight: '700'
    lineHeight: 46px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1.25rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3.5rem
---

## Brand & Style
The design system embodies the serene, revitalizing atmosphere of an Indonesian highland eco-village. It targets modern travelers, families, and eco-tourists seeking an authentic rural getaway with frictionless hospitality. The visual identity merges organic warmth and restorative quietude, communicating freshness, communal warmth, and ecological stewardship.

The aesthetic philosophy is **Tactile Warm Modernism**:
- Deep natural immersion anchored by canopy greens and fertile soil ambers.
- Generous, airy surfaces mimicking highland fog and morning dew, avoiding sterile tech conventions.
- Gentle physical cues—soft tactile pill elements, organic rounded cards, and deliberate high-contrast accessibility.
- Direct, warm pathways to community contact via prominent instant-messaging touchpoints.

## Colors
The palette captures the layered foliage of a mountain slope, transitioning from deep undergrowth to sunlit leaves and fertile volcanic earth.

- **Primary (`#1E4D2B`)**: Deep Forest Green. Imparts permanence, grounding, and quiet shelter. Used for major structural headings, brand anchors, primary action buttons, and dense UI containers.
- **Secondary (`#2E7D32`)**: Vibrant Foliage Green. Reflects vitality, organic growth, and outdoor life. Serves as active navigation indicators, badges, highlights, and secondary interactive states.
- **Tertiary (`#D97706`)**: Warm Earth Amber. Evokes mountain sunlight, woven bamboo, and local hospitality. Applied strategically for booking alerts, cultural feature callouts, star ratings, and subtle culinary accents.
- **Neutral (`#2D3748`)**: Deep Slate Charcoal. Delivers crisp legibility against pale backdrops without the harshness of pure black.
- **Canvas Base**: Set against `#F3FAF4` (Pale Mist Mint) to sustain an airy, botanical atmosphere across all page templates.
- **Special Purpose (WhatsApp/Direct CTA)**: `#25D366` is embraced selectively as an emerald communication accent, tightly paired with forest green containers for village concierge access.

## Typography
The system employs **Plus Jakarta Sans** for headlines and body text to deliver friendly, inviting geometric curves with robust outdoor readability. Headings use tight letter-spacing and substantial weights to present an approachable, human-scaled character.

**Space Grotesk** is utilized as the complementary accent/label face for package tags, trail distances, price metadata, and badge markers. Its light technical rhythm adds subtle contrast against the organic warmth of Plus Jakarta Sans.

- Display headers prioritize generous line height to prevent collision in multilingual (Indonesian/English) copy.
- Mobile scaling shifts typography thresholds down safely while retaining touch targets of at least 48px for all linked headings and trigger areas.
- Numeric displays (tariffs, room counts, elevation markers) should always use tabular figures when rendered in Space Grotesk.

## Layout & Spacing
A fluid column system with relaxed vertical pacing gives pages breathing room evocative of open highlands:
- **Mobile (< 768px)**: 4-column layout with 1.25rem margins and 1rem gutters. All actionable elements span full width or sit side-by-side in balanced pairs.
- **Tablet (768px – 1024px)**: 8-column fluid layout with 2rem margins and 1.5rem gutters. Facilitates dual-column booking configurations and experiential photo narratives.
- **Desktop (> 1024px)**: 12-column layout capped at 1280px maximum content container width to preserve optimum reading line lengths.

Vertical block pacing adopts generous spacing (`space-lg` to `space-xl`) between narrative sections, avoiding dense grid crowding and letting imagery breathe against `#F3FAF4`.

## Elevation & Depth
Depth mimics natural soft ambient light diffused through high-altitude mist. The design avoids hard drop shadows and heavy dark cast lines.

- **Level 0 (Flat Canvas)**: Base tone `#F3FAF4`. No shadows.
- **Level 1 (Card Resting)**: Background `#FFFFFF`, bordered by 1px solid `rgba(30, 77, 43, 0.08)` and supported by an ultra-soft diffuse shadow: `0 4px 20px -2px rgba(30, 77, 43, 0.05)`.
- **Level 2 (Interactive Floating / Hover)**: Background `#FFFFFF`, border `1px solid rgba(30, 77, 43, 0.15)`, shadow: `0 12px 28px -4px rgba(30, 77, 43, 0.10)`.
- **Level 3 (Sticky CTAs & WhatsApp Drawer)**: Background `#FFFFFF` or `#1E4D2B`, elevation anchored with: `0 16px 40px -6px rgba(17, 45, 25, 0.18)`.

## Shapes
Shapes are grounded in smooth pebble and leaf contours:
- Standard elements use Level 2 rounding (`0.5rem` / `8px` baseline; `1rem` / `16px` for cards).
- Hero imagery, booking trays, and primary cards use `rounded-xl` (`1.5rem` / `24px`) to reinforce a soft, organic presence.
- Badges, status chips, quick filters, and interactive action buttons adopt a complete pill format (`9999px`) for ergonomic mobile handling.

## Components

### Primary & Action Buttons
- **Primary Eco Action**: Solid `#1E4D2B` background with `#FFFFFF` text. Pill-shaped (`rounded-full`), minimum height of 48px, horizontal padding of 24px. Text styled in `label-lg`.
- **WhatsApp Concierge Button**: High-prominence fixed mobile floating trigger and contextual card action. Background `#25D366` with `#FFFFFF` text and accompanying icon. Active state darkens to `#1EBE5D`. Elevation Level 3.
- **Secondary Action**: Background transparent, border `1.5px solid #1E4D2B`, text `#1E4D2B`.

### Cards & Experience Tiles
- Built with a pure white surface (`#FFFFFF`) against the `#F3FAF4` background. Corner radius `rounded-xl` (24px) with Level 1 elevation.
- Media sections within cards must feature a top radius matching the container, using high-saturation imagery of village landscapes, farm workshops, and homestays.
- Content body has a 20px interior padding with an explicit price-per-night or duration chip positioned above the title.

### Chips & Filter Pills
- Inactive state: `#FFFFFF` fill with `1px solid rgba(45, 55, 72, 0.12)`, text `#2D3748`.
- Active state: `#1E4D2B` fill with `#FFFFFF` text. Space Grotesk `label-md`.

### Form Controls & Date Selectors
- Touch-first height: 52px.
- Background `#FFFFFF`, border `1.5px solid rgba(30, 77, 43, 0.20)`, corner radius `12px`.
- Focus state: Border color `#2E7D32` with an ambient glow of `0 0 0 3px rgba(46, 125, 50, 0.15)`.

### Checkboxes & Radios
- Size: 22px × 22px to enable effortless touch interaction.
- Checked state: `#2E7D32` fill with white check/dot icon.
- Unchecked: `#FFFFFF` with `1.5px solid rgba(45, 55, 72, 0.3)`.

### Village Notice / Announcement Banner
- Background: Soft amber wash (`#FEF3C7`) with text `#92400E` and border `1px solid #FDE68A`. Used for local festival schedules, seasonal harvests, and weather advisories.
# SmileCare Dental Clinic — Project Specification

> **Purpose:** Single reference document covering architecture, components, services, models, design system, and integration guide. Read this before touching any code — no codebase scan needed.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack & Versions](#2-tech-stack--versions)
3. [Folder Structure](#3-folder-structure)
4. [Environment Configuration](#4-environment-configuration)
5. [Routing](#5-routing)
6. [App Bootstrap](#6-app-bootstrap)
7. [Data Models (Interfaces)](#7-data-models-interfaces)
8. [Mock Data](#8-mock-data)
9. [Services](#9-services)
10. [HTTP Interceptor](#10-http-interceptor)
11. [Shared Components](#11-shared-components)
12. [Feature Pages](#12-feature-pages)
13. [Shared Pipe](#13-shared-pipe)
14. [Design System](#14-design-system)
15. [Appointment Form — Validators & Fields](#15-appointment-form--validators--fields)
16. [Backend Integration Guide](#16-backend-integration-guide)
17. [Build & Run Commands](#17-build--run-commands)
18. [Known Machine Quirk — npm](#18-known-machine-quirk--npm)
19. [Future Roadmap](#19-future-roadmap)

---

## 1. Project Overview

| Field | Value |
|-------|-------|
| Project Name | SmileCare Dental Clinic SPA |
| Client | Dental clinic in Pune, India |
| Type | Frontend-only Angular SPA (backend-ready) |
| Root Path | `D:\My Projects\Client-Projects\dental-clinic\` |
| Brand Name | SmileCare |
| Tagline | "Your Smile, Our Priority" |
| Phone | +91 98765 43210 |
| Email | info@smilecare.in |
| WhatsApp | wa.me/919876543210 |
| Address | 123, Shivaji Nagar, Near FC Road, Pune – 411005, Maharashtra |
| Emergency Phone | +91 99999 99999 |

**Working Hours:**
- Mon – Fri: 9:00 AM – 7:00 PM
- Saturday: 9:00 AM – 5:00 PM
- Sunday: Closed

---

## 2. Tech Stack & Versions

| Tool | Version | Notes |
|------|---------|-------|
| Angular CLI | 21.0.3 | |
| Angular | 21.x | Standalone components (no NgModules) |
| Node.js | 24.14.1 (active) | Via nvm — see §18 for quirk |
| npm | 11.11.0 | See §18 for workaround command |
| TypeScript | Strict mode | `"strict": true` in tsconfig.json |
| Styling | SCSS | Component-scoped + global design system |
| State | Angular Signals | `signal()`, `computed()`, no NgRx |
| Forms | Reactive Forms | `@angular/forms` |
| HTTP | HttpClient | Functional interceptors pattern |
| Routing | Angular Router | Lazy-loaded standalone components |
| Fonts | Google Fonts | Nunito + Merriweather |
| Animations | View Transitions API | `withViewTransitions()` |
| Build tool | `@angular/build:application` | esbuild-based (fast) |

**Template Syntax:** New Angular control flow — `@if`, `@for`, `@switch` (not `*ngIf`/`*ngFor`)

---

## 3. Folder Structure

```
dental-clinic/
├── spec/
│   └── project-spec.md            ← THIS FILE
├── src/
│   ├── app/
│   │   ├── app.ts                 ← Root component (selector: app-root)
│   │   ├── app.html               ← Root template: header + router-outlet + footer + whatsapp
│   │   ├── app.scss               ← View Transitions page-fade animation
│   │   ├── app.config.ts          ← ApplicationConfig — all providers
│   │   ├── app.routes.ts          ← All 6 lazy routes + wildcard redirect
│   │   │
│   │   ├── core/
│   │   │   ├── mock-data.ts       ← MOCK_DOCTORS, MOCK_SERVICES, MOCK_TESTIMONIALS, MOCK_TIME_SLOTS
│   │   │   ├── models/
│   │   │   │   ├── appointment.model.ts
│   │   │   │   ├── doctor.model.ts
│   │   │   │   └── service.model.ts
│   │   │   ├── services/
│   │   │   │   ├── appointment.service.ts
│   │   │   │   ├── doctor.service.ts
│   │   │   │   └── clinic-service.service.ts
│   │   │   └── interceptors/
│   │   │       └── api.interceptor.ts
│   │   │
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   ├── header/
│   │   │   │   │   ├── header.component.ts
│   │   │   │   │   ├── header.component.html
│   │   │   │   │   └── header.component.scss
│   │   │   │   ├── footer/
│   │   │   │   │   ├── footer.component.ts
│   │   │   │   │   ├── footer.component.html
│   │   │   │   │   └── footer.component.scss
│   │   │   │   ├── whatsapp-button/
│   │   │   │   │   ├── whatsapp-button.component.ts
│   │   │   │   │   ├── whatsapp-button.component.html
│   │   │   │   │   └── whatsapp-button.component.scss
│   │   │   │   └── page-loader/
│   │   │   │       ├── page-loader.component.ts
│   │   │   │       ├── page-loader.component.html
│   │   │   │       └── page-loader.component.scss
│   │   │   └── pipes/
│   │   │       └── phone-format.pipe.ts
│   │   │
│   │   └── features/
│   │       ├── home/
│   │       │   ├── home.component.ts
│   │       │   ├── home.component.html
│   │       │   └── home.component.scss
│   │       ├── services/
│   │       │   ├── services.component.ts
│   │       │   ├── services.component.html
│   │       │   └── services.component.scss
│   │       ├── doctors/
│   │       │   ├── doctors.component.ts
│   │       │   ├── doctors.component.html
│   │       │   └── doctors.component.scss
│   │       ├── appointments/
│   │       │   ├── appointments.component.ts
│   │       │   ├── appointments.component.html
│   │       │   └── appointments.component.scss
│   │       ├── gallery/
│   │       │   ├── gallery.component.ts
│   │       │   ├── gallery.component.html
│   │       │   └── gallery.component.scss
│   │       └── contact/
│   │           ├── contact.component.ts
│   │           ├── contact.component.html
│   │           └── contact.component.scss
│   │
│   ├── environments/
│   │   ├── environment.ts         ← DEV: apiUrl = '' (uses mock data)
│   │   └── environment.prod.ts    ← PROD: apiUrl = 'https://api.smilecare.in/v1'
│   │
│   ├── styles.scss                ← Global design system (tokens, typography, utilities)
│   ├── index.html                 ← HTML entry point (selector: app-root)
│   └── main.ts                    ← bootstrapApplication(App, appConfig)
│
├── angular.json                   ← Build config — fileReplacements for environments
├── tsconfig.json                  ← strict: true + all Angular strict flags
├── package.json
└── README.md
```

---

## 4. Environment Configuration

### `src/environments/environment.ts` (development)
```typescript
export const environment = {
  production: false,
  apiUrl: ''   // empty string → all services return MOCK_DATA
};
```

### `src/environments/environment.prod.ts` (production)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.smilecare.in/v1'
};
```

**How the swap works:** `angular.json` has `fileReplacements` under `configurations.production`:
```json
{ "replace": "src/environments/environment.ts",
  "with":    "src/environments/environment.prod.ts" }
```

`ng build --configuration=production` uses prod environment; `ng serve` (development) uses the dev environment (empty `apiUrl`).

---

## 5. Routing

**File:** `src/app/app.routes.ts`  
**Strategy:** Default path strategy (hash routing NOT used)  
**Pattern:** Every route uses `loadComponent` for lazy loading.

| Path | Loaded Component | Chunk Name |
|------|-----------------|------------|
| `` (empty) | `HomeComponent` | `home-component` |
| `services` | `ServicesComponent` | `services-component` |
| `doctors` | `DoctorsComponent` | `doctors-component` |
| `appointments` | `AppointmentsComponent` | `appointments-component` |
| `gallery` | `GalleryComponent` | `gallery-component` |
| `contact` | `ContactComponent` | `contact-component` |
| `**` | Redirect → `''` | (no chunk) |

**Query-param pre-fill:**
- `/appointments?service=<id>` → pre-fills the service dropdown
- `/appointments?doctorId=<id>` → pre-fills the doctor dropdown
- Used by "Book for This Service" buttons on `/services` and "Book Appointment" on `/doctors`

---

## 6. App Bootstrap

**File:** `src/app/app.config.ts`

```typescript
providers: [
  provideBrowserGlobalErrorListeners(),               // Angular 21 global error handler
  provideRouter(routes, withViewTransitions()),        // Lazy routes + browser View Transitions API
  provideHttpClient(withInterceptors([apiInterceptor])) // HttpClient + JWT interceptor stub
]
```

**Root component** (`src/app/app.ts`):
- Selector: `app-root`
- Imports: `RouterOutlet, HeaderComponent, FooterComponent, WhatsappButtonComponent`
- Template structure: `<app-header> → <main.main-content><router-outlet> → <app-footer> → <app-whatsapp-button>`

---

## 7. Data Models (Interfaces)

### `Appointment` — `core/models/appointment.model.ts`
```typescript
interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  service: string;       // service id
  doctorId: string;
  date: string;          // ISO date string YYYY-MM-DD
  timeSlot: string;      // e.g. "10:30 AM"
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}
```

### `Doctor` — `core/models/doctor.model.ts`
```typescript
interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;    // years
  bio: string;
  imageUrl: string;      // empty string in mock data (no real images)
  available: boolean;
}
```

### `ClinicService` — `core/models/service.model.ts`
```typescript
interface ClinicService {
  id: string;
  name: string;
  description: string;
  duration: number;  // minutes
  price: string;     // e.g. "₹500 – ₹2,000"
  icon: string;      // emoji
}
```

### `Testimonial` — `core/mock-data.ts` (inline, not a separate model file)
```typescript
interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  rating: number;    // 1–5
  comment: string;
  location: string;  // e.g. "Koregaon Park, Pune"
}
```

---

## 8. Mock Data

**File:** `src/app/core/mock-data.ts`  
All exports marked with `// TODO: Remove when API is ready`

### `MOCK_DOCTORS: Doctor[]` (4 doctors)

| id | Name | Specialization | Experience | Available |
|----|------|----------------|------------|-----------|
| 1 | Dr. Priya Sharma | Orthodontist | 12 yrs | ✅ |
| 2 | Dr. Rahul Mehta | Oral Surgeon | 8 yrs | ✅ |
| 3 | Dr. Sneha Joshi | Pediatric Dentist | 6 yrs | ❌ |
| 4 | Dr. Amit Desai | General Dentist | 15 yrs | ✅ |

### `MOCK_SERVICES: ClinicService[]` (6 services)

| id | Name | Duration | Price |
|----|------|----------|-------|
| 1 | General Dentistry | 60 min | ₹500 – ₹2,000 |
| 2 | Orthodontics | 45 min | ₹15,000 – ₹60,000 |
| 3 | Teeth Whitening | 90 min | ₹3,000 – ₹8,000 |
| 4 | Root Canal Treatment | 90 min | ₹4,000 – ₹12,000 |
| 5 | Dental Implants | 120 min | ₹25,000 – ₹80,000 |
| 6 | Pediatric Dentistry | 45 min | ₹500 – ₹3,000 |

### `MOCK_TESTIMONIALS: Testimonial[]` (3 testimonials)

| Name | Treatment | Rating | Location |
|------|-----------|--------|----------|
| Prachi Kulkarni | Orthodontics | ⭐⭐⭐⭐⭐ | Koregaon Park, Pune |
| Rohan Deshmukh | Dental Implants | ⭐⭐⭐⭐⭐ | Kothrud, Pune |
| Meera Patil | Teeth Whitening | ⭐⭐⭐⭐⭐ | Baner, Pune |

### `MOCK_TIME_SLOTS: string[]` (21 slots)
9:00 AM → 7:00 PM in 30-minute increments.
```
'9:00 AM', '9:30 AM', '10:00 AM', ... '6:30 PM', '7:00 PM'
```

---

## 9. Services

All services use `inject(HttpClient)` and follow the same **apiUrl gate** pattern:

```typescript
if (!environment.apiUrl) {
  // TODO: replace with API call when backend is ready
  return of(MOCK_DATA);
}
return this.http.get<T>(`${environment.apiUrl}/endpoint`);
```

### `AppointmentService` — `core/services/appointment.service.ts`

| Method | Signature | Mock behaviour | API endpoint |
|--------|-----------|----------------|--------------|
| `bookAppointment` | `(appointment: Omit<Appointment, 'id'\|'status'>): Observable<Appointment>` | Generates UUID id, sets status='pending', saves to `localStorage['smilecare_appointments']` | `POST /appointments` |
| `getAppointments` | `(): Observable<Appointment[]>` | Reads from `localStorage['smilecare_appointments']` | `GET /appointments` |
| `getAvailableSlots` | `(doctorId: string, date: string): Observable<string[]>` | Returns `MOCK_TIME_SLOTS` | `GET /appointments/slots?doctorId=&date=` |

### `DoctorService` — `core/services/doctor.service.ts`

| Method | Signature | Mock behaviour | API endpoint |
|--------|-----------|----------------|--------------|
| `getAllDoctors` | `(): Observable<Doctor[]>` | Returns `MOCK_DOCTORS` | `GET /doctors` |
| `getDoctorById` | `(id: string): Observable<Doctor \| undefined>` | `MOCK_DOCTORS.find(d => d.id === id)` | `GET /doctors/:id` |

### `ClinicServiceService` — `core/services/clinic-service.service.ts`

| Method | Signature | Mock behaviour | API endpoint |
|--------|-----------|----------------|--------------|
| `getAllServices` | `(): Observable<ClinicService[]>` | Returns `MOCK_SERVICES` | `GET /services` |

---

## 10. HTTP Interceptor

**File:** `src/app/core/interceptors/api.interceptor.ts`  
**Type:** `HttpInterceptorFn` (functional, not class-based)  
**Status:** Passthrough stub — currently returns `next(req)` unchanged.

**To add JWT auth**, replace the stub with:
```typescript
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  if (token) {
    return next(req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    }));
  }
  return next(req);
};
```

Wired in `app.config.ts` via `provideHttpClient(withInterceptors([apiInterceptor]))`.

---

## 11. Shared Components

### `HeaderComponent` — `shared/components/header/`
- **Selector:** `app-header`
- **Imports:** `RouterLink, RouterLinkActive`
- **Signals:** `isScrolled`, `mobileMenuOpen`
- **Key behaviours:**
  - `@HostListener('window:scroll')` → sets `isScrolled` when `scrollY > 20px`
  - `[class.scrolled]` on `<header>` drives the transparent→white transition
  - Mobile hamburger at ≤768px; `mobileMenuOpen` drives `@if` drawer
  - Active route highlighted via `routerLinkActive="active"` with `{ exact: true }` for home
  - "Book Now" pill button always links to `/appointments`
- **Nav links:** Home `/`, Services `/services`, Doctors `/doctors`, Appointments `/appointments`, Gallery `/gallery`, Contact `/contact`

### `FooterComponent` — `shared/components/footer/`
- **Selector:** `app-footer`
- **Imports:** `RouterLink, PhoneFormatPipe`
- **Layout:** 3-column grid (brand + tagline | quick links | contact & hours)
- **Bottom bar:** `© {currentYear} SmileCare` + "Made with ❤️ for SmileCare"
- **Background:** `#0D1B3E` (deep navy)

### `WhatsappButtonComponent` — `shared/components/whatsapp-button/`
- **Selector:** `app-whatsapp-button`
- **Imports:** none
- **Position:** `fixed` bottom-right `(28px, 28px)`, `z-index: 999`
- **Size:** 56px circle, WhatsApp green `#25D366`
- **Animation:** CSS `@keyframes wa-pulse` — radiating ring every 2.5s
- **Link:** `https://wa.me/919876543210` (opens in new tab)
- **Tooltip:** "Chat with us" appears on hover (left of button)

### `PageLoaderComponent` — `shared/components/page-loader/`
- **Selector:** `app-page-loader`
- **Imports:** none
- **Usage:** Drop `<app-page-loader />` inside `@if (loading())` blocks in feature components
- **Style:** 4-ring spinning loader centered in an 80px padded container

---

## 12. Feature Pages

### Home — `/` — `features/home/`
**Selector:** `app-home` | **Imports:** `RouterLink, PageLoaderComponent`

**Sections (in order):**
1. **Hero** — gradient background (deep blue→teal), headline, subtitle, 2 CTA buttons, 3 floating cards, scroll indicator
2. **Stats Bar** — white bar with 4 stats (15+ Years, 5,000+ Patients, 12 Doctors, 4.9★ Rating)
3. **Services Preview** — 3-column grid of all 6 service cards loaded from `ClinicServiceService`. Each card shows icon, name, description, price, "Book" button (links to `/appointments?service=<id>`)
4. **Why Us** — 3 cards: Advanced Technology ⚡ | Expert Team 👨‍⚕️ | Patient Comfort 💙
5. **Testimonials** — 3 cards loaded from `MOCK_TESTIMONIALS`
6. **Final CTA Banner** — gradient strip with "Book Appointment Now" button

**Signals:** `services`, `testimonials`, `loading`  
**Scroll animations:** `IntersectionObserver` called in `ngAfterViewInit` adds `.visible` class to `.animate-on-scroll` elements

---

### Services — `/services` — `features/services/`
**Selector:** `app-services` | **Imports:** `RouterLink, PageLoaderComponent`

**Layout:** Single column — each service is a wide card with large icon on left, details on right (name, description, duration, price range, "Book for This Service" button)

**Signals:** `services`, `loading`

---

### Doctors — `/doctors` — `features/doctors/`
**Selector:** `app-doctors` | **Imports:** `RouterLink, PageLoaderComponent`

**Layout:** 2-column grid of doctor cards. Each card has:
- Gradient avatar (initials, generated by `getInitials(name)`)
- Availability badge (green ✓ / orange ✗)
- Name, specialization, experience pill, bio
- "Book Appointment" button → `/appointments?doctorId=<id>`

**Signals:** `doctors`, `loading`  
Doctors filtered to available-only in AppointmentsComponent; full list shown here.

---

### Appointments — `/appointments` — `features/appointments/`
**Selector:** `app-appointments` | **Imports:** `ReactiveFormsModule, RouterLink`

**Two states driven by `submitSuccess` signal:**
1. **Form state** — Reactive form in 3 sections + sidebar
2. **Success state** — Animated booking summary card

**Form sections:**
- Section 1: Personal Info (name, phone, email)
- Section 2: Appointment Details (service, doctor, date, time slot)
- Section 3: Additional Info (message, optional)

**Sidebar:** Location, working hours, emergency contact card

See §15 for full form field/validator details.

---

### Gallery — `/gallery` — `features/gallery/`
**Selector:** `app-gallery` | **Imports:** none

**Layout:** CSS masonry grid (`grid-auto-rows: 200px`)  
- 4 columns on desktop, 3 on tablet, 2 on mobile, 1 on small mobile
- Items have sizes: `normal` (1×1), `tall` (2 rows), `wide` (2 columns)

**Filter tabs:** All | Clinic | Equipment | Team  
`activeFilter` signal → `filteredItems` computed signal

**12 gallery items** (gradient placeholder cards, no real images):
- Clinic (5): Exterior, Reception, Treatment Room 1, Waiting Lounge, Pediatric Zone
- Equipment (4): Dental Chair, Digital X-Ray, Sterilization Unit, 3D Cone-Beam CT
- Team (3): Our Team, Dr. Priya Sharma, Dr. Rahul Mehta

Hover reveals overlay with label + category.

---

### Contact — `/contact` — `features/contact/`
**Selector:** `app-contact` | **Imports:** `ReactiveFormsModule, PhoneFormatPipe`

**Layout:** 2-column grid (form | info panel)

**Contact form fields:** name, email, phone, message (required)  
On submit: `console.log(formValue)` — `// TODO: replace with API call when backend is ready`

**Info panel cards:** Location, Phone, Email, Working Hours, Emergency card (amber/orange themed)

**Map:** Google Maps iframe of Pune via `SafeResourceUrl` from `DomSanitizer`

**Two states:** form | success (animated ✅)

---

## 13. Shared Pipe

### `PhoneFormatPipe` — `shared/pipes/phone-format.pipe.ts`
- **Name:** `phoneFormat` (use in templates as `{{ value | phoneFormat }}`)
- **Standalone:** yes
- **Logic:**
  - 10-digit string → `+91 XXXXX XXXXX`
  - 12-digit string starting with `91` → `+91 XXXXX XXXXX`
  - Anything else → returned as-is
- **Null-safe:** returns `''` for null/undefined input
- **Used in:** `FooterComponent`, `ContactComponent`

---

## 14. Design System

**File:** `src/styles.scss`  
Google Fonts import: `Nunito` (300/400/600/700) + `Merriweather` (400/700/italic)

### CSS Custom Properties

```scss
// Colors
--primary:       #1565C0   // deep medical blue — primary actions, headings
--primary-light: #1E88E5   // hover states for primary
--primary-pale:  #E3F2FD   // backgrounds, badges, section tints
--accent:        #00ACC1   // teal — "Book Now" buttons, highlights
--accent-pale:   #E0F7FA   // accent backgrounds
--success:       #2E7D32   // availability badge green
--text:          #1A237E   // dark navy — headings
--text-body:     #37474F   // body copy
--text-muted:    #78909C   // labels, subtitles, placeholders
--white:         #FFFFFF
--bg:            #F8FAFE   // page background (slightly blue-tinted white)
--bg-card:       #FFFFFF   // card backgrounds
--border:        rgba(21, 101, 192, 0.12)  // subtle blue-tinted borders

// Typography
--font-sans:  'Nunito', sans-serif     // all body text, labels, buttons
--font-serif: 'Merriweather', serif    // all headings (h1–h6)

// Border Radius
--radius-sm:   8px
--radius-md:   16px
--radius-lg:   24px
--radius-full: 9999px    // pills and circles

// Shadows (all blue-tinted)
--shadow-sm: 0 2px 8px  rgba(21, 101, 192, 0.08)
--shadow-md: 0 4px 16px rgba(21, 101, 192, 0.12)
--shadow-lg: 0 8px 32px rgba(21, 101, 192, 0.16)
```

### Global Utility Classes

| Class | Purpose |
|-------|---------|
| `.container` | `max-width: 1200px`, `margin: 0 auto`, `padding: 0 24px` |
| `.section` | `padding: 80px 0` (60px on tablet, 48px on mobile) |
| `.section-title` | Centred heading block with `h2` + `p` subtitle |
| `.subtitle-tag` | Small pill label above section headings |
| `.page-hero` | Inner page hero (blue gradient, centred, 80px padding) |
| `.btn.btn--primary` | Solid blue rounded pill button |
| `.btn.btn--accent` | Teal rounded pill button |
| `.btn.btn--outline` | Transparent + white border (for dark backgrounds) |
| `.btn.btn--outline-primary` | Transparent + blue border (for light backgrounds) |
| `.form-group` | Flex column: label + `.form-control` + `.error-msg` |
| `.form-row` | 2-column grid (collapses to 1 on ≤640px) |
| `.animate-on-scroll` | Starts `opacity:0; translateY(24px)` → `.visible` class adds visible state |
| `.main-content` | `padding-top: 76px` to offset fixed header |

### Breakpoints

| Name | Value | Usage |
|------|-------|-------|
| sm | 480px | Single-column grids on very small screens |
| md | 768px | Hamburger menu, 2-column grids collapse |
| lg | 1024px | 3→2 column grids |
| xl | 1280px | (max-width of `.container` is 1200px) |

### Scroll Animations
Elements with `.animate-on-scroll` are observed by `IntersectionObserver` in each feature component's `ngAfterViewInit`. When 10% visible (with a -40px bottom margin), `.visible` is added → CSS transition fires. Children stagger by `0.07s × nth-child` (up to 12 items).

### Page Transitions
`withViewTransitions()` in `app.config.ts` uses the browser View Transitions API. `app.scss` defines `::view-transition-old/new(root)` animations: 0.2s fade out → fade in.

---

## 15. Appointment Form — Validators & Fields

**File:** `features/appointments/appointments.component.ts`  
**Type:** `FormGroup` built with `FormBuilder`

### Form Controls

| Field | Type | Validators | Notes |
|-------|------|------------|-------|
| `patientName` | text | `required`, `minLength(2)` | |
| `email` | email | `required`, `email` | Angular built-in email pattern |
| `phone` | tel | `required`, `pattern(/^[6-9]\d{9}$/)` | Indian mobile: 10 digits, starts 6–9 |
| `service` | select | `required` | Options from `ClinicServiceService.getAllServices()` |
| `doctorId` | select | `required` | Options from `DoctorService.getAllDoctors()` — filtered to `available: true` only |
| `date` | date | `required`, `futureDateNotSundayValidator()` | min attribute = today's date |
| `timeSlot` | select | `required` | Options from `AppointmentService.getAvailableSlots()` — loaded when both doctorId AND date are set |
| `message` | textarea | `maxLength(300)` | Optional field |

### Custom Validator: `futureDateNotSundayValidator()`
```typescript
// Returns: { pastDate: true } if date < today
// Returns: { sunday: true } if day === 0 (Sunday)
// Returns: null if valid
```

### Form Behaviour
- `submitted` signal → activates `.error` CSS class on invalid controls
- When `doctorId` or `date` changes → `loadSlots()` called → populates `timeSlots` signal
- Query params on init: `?service=<id>` and/or `?doctorId=<id>` pre-fill those fields
- On valid submit → `AppointmentService.bookAppointment()` → `submitSuccess` signal → success card
- Success card shows: Ref ID (first 8 chars of UUID uppercased), name, date, time, status

---

## 16. Backend Integration Guide

### Step 1 — Set the API URL (only required change)
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-api-domain.com/v1'  // ← fill this in
};
```

### Step 2 — Deploy with production build
```bash
ng build --configuration=production
```

That's it. No template, component, or service code changes are needed.

### How it works (service pattern)
```typescript
getAllDoctors(): Observable<Doctor[]> {
  if (!environment.apiUrl) {
    return of(MOCK_DOCTORS);           // dev: mock data
  }
  return this.http.get<Doctor[]>(`${environment.apiUrl}/doctors`);  // prod: real API
}
```

### Expected API contract

| Method | Path | Request Body | Response |
|--------|------|-------------|---------|
| GET | `/doctors` | — | `Doctor[]` |
| GET | `/doctors/:id` | — | `Doctor` |
| GET | `/services` | — | `ClinicService[]` |
| GET | `/appointments` | — | `Appointment[]` |
| POST | `/appointments` | `Omit<Appointment, 'id' \| 'status'>` | `Appointment` (with id + status) |
| GET | `/appointments/slots?doctorId=X&date=Y` | — | `string[]` (time slot labels) |

### Step 3 — Add Authentication (when ready)

Edit `src/app/core/interceptors/api.interceptor.ts`:
```typescript
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();
  if (token) {
    return next(req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    }));
  }
  return next(req);
};
```

The interceptor is already wired into `provideHttpClient(withInterceptors([apiInterceptor]))` — no changes to `app.config.ts` needed.

### Step 4 — Contact Form API
`ContactComponent.onSubmit()` currently calls `console.log(formValue)`.
When backend is ready, inject an `HttpClient` and POST to `/contact`:
```typescript
this.http.post(`${environment.apiUrl}/contact`, formValue).subscribe(...)
```

---

## 17. Build & Run Commands

```bash
# Navigate to project
cd "D:\My Projects\Client-Projects\dental-clinic"

# Install packages (use v25 npm — see §18)
& "C:\Users\SanketMahajan\AppData\Roaming\nvm\v25.9.0\npm.cmd" install

# Development server (http://localhost:4200)
ng serve

# Production build (uses environment.prod.ts)
ng build --configuration=production
# Output: dist/dental-clinic/

# Development build
ng build --configuration=development
```

---

## 18. Known Machine Quirk — npm

**Problem:** `C:\Program Files\nodejs\` is nvm-symlinked to `v20.19.5`, but the `node_modules/npm/node_modules/minizlib` inside that path is incompatible with the active Node v24. Running plain `npm install` inside this project will fail with:
```
TypeError: Class extends value undefined is not a constructor or null
```

**Fix:** Always use the npm bundled with nvm v25.9.0 instead:
```powershell
& "C:\Users\SanketMahajan\AppData\Roaming\nvm\v25.9.0\npm.cmd" install
```

**Dev server** (`ng serve`) and **build** (`ng build`) work normally because they use the globally installed Angular CLI, not npm directly.

---

## 19. Future Roadmap

Listed in priority order:

| Feature | Notes |
|---------|-------|
| **Patient Login** | JWT auth, appointment history, personal health records |
| **Doctor Dashboard** | View/manage scheduled appointments, confirm or reschedule |
| **Online Payments** | Razorpay or PayU — booking deposit or full consultation fee |
| **SMS/Email Reminders** | Twilio/AWS SNS — confirmation + 24h reminder |
| **Multi-branch Support** | Multiple SmileCare clinic locations, branch selector |
| **Admin CMS** | Manage doctors, services, gallery images without code changes |
| **Reviews & Ratings** | Patient reviews with photo uploads, moderation queue |
| **PWA** | Service worker for offline support + mobile install prompt |
| **Angular SSR** | Server-side rendering for better SEO and first-paint performance |
| **Real-time Chat** | WebSocket-based live chat (replace WhatsApp CTA) |

---

*Last updated: 2026-05-31 · SmileCare Dental Clinic, Pune*

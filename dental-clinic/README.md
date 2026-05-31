# SmileCare Dental Clinic — Angular SPA

A complete, production-ready Angular 17+ single-page application for SmileCare Dental Clinic, Pune. Built with standalone components, Angular Signals, Reactive Forms, and a custom SCSS design system — fully architected to connect to a REST API backend with zero template changes.

---

## Quick Start

```bash
npm install
ng serve
# Open http://localhost:4200
```

---

## Tech Stack

| Tool | Version |
|------|---------|
| Angular CLI | 21+ |
| Node.js | 20.x / 24.x |
| TypeScript | Strict mode |
| Styling | Component-scoped SCSS + global design system |
| State | Angular Signals |
| Forms | Reactive Forms with custom validators |
| HTTP | HttpClient + functional interceptors |
| Routing | Lazy-loaded standalone components |

---

## Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   ├── appointment.model.ts    # Appointment interface
│   │   │   ├── doctor.model.ts         # Doctor interface
│   │   │   └── service.model.ts        # ClinicService interface
│   │   ├── services/
│   │   │   ├── appointment.service.ts  # bookAppointment, getAppointments, getAvailableSlots
│   │   │   ├── doctor.service.ts       # getAllDoctors, getDoctorById
│   │   │   └── clinic-service.service.ts # getAllServices
│   │   ├── interceptors/
│   │   │   └── api.interceptor.ts      # Auth header stub (add JWT here when ready)
│   │   └── mock-data.ts                # MOCK_DOCTORS, MOCK_SERVICES, MOCK_TESTIMONIALS, etc.
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── header/                 # Sticky nav, mobile hamburger, scroll effect
│   │   │   ├── footer/                 # 3-column footer with links and hours
│   │   │   ├── whatsapp-button/        # Fixed floating WhatsApp CTA with pulse animation
│   │   │   └── page-loader/            # Reusable loading spinner
│   │   └── pipes/
│   │       └── phone-format.pipe.ts    # Formats raw digits → +91 XXXXX XXXXX
│   │
│   ├── features/
│   │   ├── home/          # Hero, stats bar, services preview, testimonials, CTA
│   │   ├── services/      # Full services grid with details and booking links
│   │   ├── doctors/       # Doctor cards with availability badges
│   │   ├── appointments/  # Full reactive booking form with validation + success state
│   │   ├── gallery/       # Masonry CSS grid with filter tabs (All/Clinic/Equipment/Team)
│   │   └── contact/       # Contact form, Google Maps embed, info panel, emergency card
│   │
│   ├── app.ts             # Root component
│   ├── app.html           # Root template (header + router-outlet + footer + whatsapp)
│   ├── app.config.ts      # ApplicationConfig — provideRouter + provideHttpClient + interceptor
│   └── app.routes.ts      # Lazy-loaded routes for all 6 pages
│
├── environments/
│   ├── environment.ts       # DEV — apiUrl: '' (returns mock data)
│   └── environment.prod.ts  # PROD — apiUrl: 'https://api.smilecare.in/v1'
│
└── styles.scss              # Global design system (CSS tokens, typography, utilities)
```

---

## How to Connect a Real Backend

The architecture is designed so that switching from mock data to a live API requires **only one change**: set `apiUrl` in `src/environments/environment.prod.ts`.

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-actual-api.com/v1'  // ← set this
};
```

### Service Pattern

Every service follows this exact pattern:

```typescript
getAllDoctors(): Observable<Doctor[]> {
  if (!environment.apiUrl) {
    // TODO: replace with API call when backend is ready
    return of(MOCK_DOCTORS);
  }
  return this.http.get<Doctor[]>(`${environment.apiUrl}/doctors`);
}
```

When `apiUrl` is empty → mock data. When set → real HTTP calls. No component or template changes needed.

### Expected REST API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/doctors` | List all doctors |
| `GET` | `/doctors/:id` | Get doctor by ID |
| `GET` | `/services` | List all services |
| `GET` | `/appointments` | List all appointments |
| `POST` | `/appointments` | Create a new appointment |
| `GET` | `/appointments/slots?doctorId=X&date=Y` | Available time slots |

### Adding JWT Authentication

Update `src/app/core/interceptors/api.interceptor.ts`:

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

The interceptor is already wired into `provideHttpClient(withInterceptors([apiInterceptor]))`.

---

## Production Build

```bash
ng build --configuration=production
# Output: dist/dental-clinic/
```

---

## Features

| Feature | Status |
|---------|--------|
| 6 pages with lazy-loaded routing | ✅ |
| Responsive mobile-first design (480/768/1024/1280px) | ✅ |
| Sticky header with scroll-triggered style change | ✅ |
| Mobile hamburger menu with slide-down drawer | ✅ |
| Appointment booking form with reactive validation | ✅ |
| Custom validators: no past dates, no Sundays | ✅ |
| Indian mobile number validation (6–9 prefix) | ✅ |
| Service/doctor pre-fill from URL query params | ✅ |
| Booking success state with appointment summary | ✅ |
| localStorage persistence for appointments (dev) | ✅ |
| Gallery with CSS masonry grid and filter tabs | ✅ |
| Contact form + Google Maps embed (Pune) | ✅ |
| WhatsApp CTA button with pulse animation | ✅ |
| Scroll-triggered fade-in animations (IntersectionObserver) | ✅ |
| Page transition animations (View Transitions API) | ✅ |
| Phone format pipe (+91 formatting) | ✅ |
| HTTP interceptor stub for JWT auth | ✅ |
| Environment-based API switching (zero template changes) | ✅ |

---

## Future Roadmap

- **Patient Login** — JWT auth, appointment history, personal health records
- **Doctor Dashboard** — View/manage appointments, confirm or reschedule
- **Online Payments** — Razorpay/PayU integration for consultation fees
- **SMS/Email Reminders** — Automated appointment confirmation and reminders
- **Multi-branch Support** — Multiple SmileCare clinic locations
- **Admin Panel** — CMS for doctors, services, gallery images
- **Reviews & Ratings** — Patient reviews with photo uploads
- **PWA** — Offline support and mobile-installable app
- **Angular SSR** — Server-side rendering for SEO

---

## Design System

Defined in `src/styles.scss`:

```scss
--primary:       #1565C0   // Deep medical blue
--accent:        #00ACC1   // Teal for highlights
--font-sans:     'Nunito'  // Body text (300/400/600/700)
--font-serif:    'Merriweather' // Headings (400/700 italic)
```

---

*Made with ❤️ for SmileCare Dental Clinic, Pune*

import {
  Component, OnInit, AfterViewInit, signal, inject
} from '@angular/core';
import {
  FormBuilder, ReactiveFormsModule, Validators,
  AbstractControl, ValidationErrors, ValidatorFn
} from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../core/services/appointment.service';
import { DoctorService } from '../../core/services/doctor.service';
import { ClinicServiceService } from '../../core/services/clinic-service.service';
import { Doctor } from '../../core/models/doctor.model';
import { ClinicService } from '../../core/models/service.model';
import { Appointment } from '../../core/models/appointment.model';

function futureDateNotSundayValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const selectedDate = new Date(control.value + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return { pastDate: true };
    }
    if (selectedDate.getDay() === 0) {
      return { sunday: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  private appointmentService = inject(AppointmentService);
  private doctorService = inject(DoctorService);
  private clinicServiceService = inject(ClinicServiceService);
  private route = inject(ActivatedRoute);

  doctors = signal<Doctor[]>([]);
  services = signal<ClinicService[]>([]);
  timeSlots = signal<string[]>([]);
  loading = signal(false);
  submitted = signal(false);
  submitSuccess = signal(false);
  bookedAppointment = signal<Appointment | null>(null);

  readonly minDate = new Date().toISOString().split('T')[0];

  form = this.fb.group({
    patientName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    service: ['', Validators.required],
    doctorId: ['', Validators.required],
    date: ['', [Validators.required, futureDateNotSundayValidator()]],
    timeSlot: ['', Validators.required],
    message: ['', Validators.maxLength(300)]
  });

  get f() { return this.form.controls; }

  ngOnInit(): void {
    this.clinicServiceService.getAllServices().subscribe(s => this.services.set(s));
    this.doctorService.getAllDoctors().subscribe(d => this.doctors.set(d.filter(doc => doc.available)));

    // Pre-fill from query params (e.g. from Services or Doctors page)
    this.route.queryParams.subscribe(params => {
      if (params['service']) {
        this.form.patchValue({ service: params['service'] });
      }
      if (params['doctorId']) {
        this.form.patchValue({ doctorId: params['doctorId'] });
        this.loadSlots();
      }
    });

    this.form.get('doctorId')?.valueChanges.subscribe(() => this.loadSlots());
    this.form.get('date')?.valueChanges.subscribe(() => this.loadSlots());
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initScrollAnimations(), 100);
  }

  private loadSlots(): void {
    const doctorId = this.form.get('doctorId')?.value;
    const date = this.form.get('date')?.value;
    if (doctorId && date) {
      this.appointmentService.getAvailableSlots(doctorId, date).subscribe(slots => {
        this.timeSlots.set(slots);
        this.form.patchValue({ timeSlot: '' });
      });
    } else {
      this.timeSlots.set([]);
      this.form.patchValue({ timeSlot: '' });
    }
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) {
      const firstInvalid = document.querySelector('.form-control.error') as HTMLElement;
      firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    this.loading.set(true);
    const v = this.form.value;
    this.appointmentService.bookAppointment({
      patientName: v.patientName!,
      email: v.email!,
      phone: v.phone!,
      service: v.service!,
      doctorId: v.doctorId!,
      date: v.date!,
      timeSlot: v.timeSlot!,
      message: v.message ?? ''
    }).subscribe({
      next: (appt) => {
        this.loading.set(false);
        this.submitSuccess.set(true);
        this.bookedAppointment.set(appt);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: () => this.loading.set(false)
    });
  }

  bookAnother(): void {
    this.form.reset();
    this.submitted.set(false);
    this.submitSuccess.set(false);
    this.bookedAppointment.set(null);
    this.timeSlots.set([]);
  }

  messageLength(): number {
    return this.f.message.value?.length ?? 0;
  }

  private initScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
  }
}

import { Component, OnInit, AfterViewInit, signal, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PhoneFormatPipe } from '../../shared/pipes/phone-format.pipe';

interface ContactFormValue {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, PhoneFormatPipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, AfterViewInit {
  private fb = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);

  submitted = signal(false);
  contactSuccess = signal(false);

  readonly phone = '9876543210';
  readonly email = 'info@smilecare.in';
  readonly address = 'Vastu Avenue, Gangapur - Satpur Link Rd, beside marble house, near motiwala college, Dhurav Nagar, Satpur Colony, Nashik, Maharashtra 422012';
  readonly emergencyPhone = '9999999999';

  readonly mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60541.82043073844!2d73.81281965!3d18.5235886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin'
  );

  readonly workingHours = [
    { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    message: ['', [Validators.required, Validators.maxLength(500)]]
  });

  get f() { return this.form.controls; }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => this.initScrollAnimations(), 100);
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;

    const value = this.form.value as ContactFormValue;
    // TODO: replace with API call when backend is ready
    console.log('Contact form submission:', value);

    this.contactSuccess.set(true);
    this.form.reset();
    this.submitted.set(false);
  }

  sendAnother(): void {
    this.contactSuccess.set(false);
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

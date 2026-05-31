import { Component, OnInit, AfterViewInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClinicServiceService } from '../../core/services/clinic-service.service';
import { ClinicService } from '../../core/models/service.model';
import { Testimonial, MOCK_TESTIMONIALS } from '../../core/mock-data';
import { PageLoaderComponent } from '../../shared/components/page-loader/page-loader.component';

interface Stat {
  value: string;
  label: string;
  icon: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, PageLoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  private clinicServiceService = inject(ClinicServiceService);

  services = signal<ClinicService[]>([]);
  testimonials = signal<Testimonial[]>([]);
  loading = signal(true);

  readonly stats: Stat[] = [
    { value: '15+', label: 'Years of Excellence', icon: '🏆' },
    { value: '5,000+', label: 'Happy Patients', icon: '😊' },
    { value: '12', label: 'Expert Doctors', icon: '👨‍⚕️' },
    { value: '4.9★', label: 'Google Rating', icon: '⭐' }
  ];

  readonly features: Feature[] = [
    {
      icon: '⚡',
      title: 'Advanced Technology',
      description: 'Cutting-edge equipment including digital X-rays, 3D cone-beam CT, intraoral cameras, and laser dentistry for precise and painless treatments.'
    },
    {
      icon: '👨‍⚕️',
      title: 'Expert Team',
      description: 'Our 12 specialists bring decades of combined experience across all dental disciplines — from orthodontics to implantology and pediatric dentistry.'
    },
    {
      icon: '💙',
      title: 'Patient Comfort',
      description: 'We prioritize your comfort with a calm, welcoming environment, gentle techniques, and sedation options for patients with dental anxiety.'
    }
  ];

  starArray(count: number): number[] {
    return Array.from({ length: count }, (_, i) => i);
  }

  ngOnInit(): void {
    this.clinicServiceService.getAllServices().subscribe(s => {
      this.services.set(s);
      this.loading.set(false);
    });
    this.testimonials.set(MOCK_TESTIMONIALS);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initScrollAnimations(), 100);
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

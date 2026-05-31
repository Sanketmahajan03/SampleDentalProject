import { Component, OnInit, AfterViewInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DoctorService } from '../../core/services/doctor.service';
import { Doctor } from '../../core/models/doctor.model';
import { PageLoaderComponent } from '../../shared/components/page-loader/page-loader.component';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [RouterLink, PageLoaderComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent implements OnInit, AfterViewInit {
  private doctorService = inject(DoctorService);

  doctors = signal<Doctor[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.doctorService.getAllDoctors().subscribe(d => {
      this.doctors.set(d);
      this.loading.set(false);
    });
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

  getInitials(name: string): string {
    return name.split(' ').filter(p => p.length > 0).map(p => p[0]).join('').slice(0, 2);
  }
}

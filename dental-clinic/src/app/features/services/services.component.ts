import { Component, OnInit, AfterViewInit, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClinicServiceService } from '../../core/services/clinic-service.service';
import { ClinicService } from '../../core/models/service.model';
import { PageLoaderComponent } from '../../shared/components/page-loader/page-loader.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink, PageLoaderComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit, AfterViewInit {
  private clinicServiceService = inject(ClinicServiceService);

  services = signal<ClinicService[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.clinicServiceService.getAllServices().subscribe(s => {
      this.services.set(s);
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
}

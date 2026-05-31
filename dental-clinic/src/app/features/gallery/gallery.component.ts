import { Component, AfterViewInit, signal, computed } from '@angular/core';

interface GalleryItem {
  id: string;
  label: string;
  category: string;
  gradient: string;
  size: 'normal' | 'tall' | 'wide';
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements AfterViewInit {
  activeFilter = signal<string>('All');

  readonly filters = ['All', 'Clinic', 'Equipment', 'Team'];

  readonly allItems: GalleryItem[] = [
    { id: '1', label: 'Clinic Exterior', category: 'Clinic', gradient: 'linear-gradient(135deg,#1565C0,#00ACC1)', size: 'wide' },
    { id: '2', label: 'Reception Area', category: 'Clinic', gradient: 'linear-gradient(135deg,#1E88E5,#1565C0)', size: 'tall' },
    { id: '3', label: 'Treatment Room 1', category: 'Clinic', gradient: 'linear-gradient(135deg,#00ACC1,#1E88E5)', size: 'normal' },
    { id: '4', label: 'Dental Chair Unit', category: 'Equipment', gradient: 'linear-gradient(135deg,#5E35B1,#1565C0)', size: 'normal' },
    { id: '5', label: 'Digital X-Ray', category: 'Equipment', gradient: 'linear-gradient(135deg,#1565C0,#5E35B1)', size: 'tall' },
    { id: '6', label: 'Sterilization Unit', category: 'Equipment', gradient: 'linear-gradient(135deg,#00897B,#00ACC1)', size: 'normal' },
    { id: '7', label: 'Our Team', category: 'Team', gradient: 'linear-gradient(135deg,#1E88E5,#00897B)', size: 'wide' },
    { id: '8', label: 'Dr. Priya Sharma', category: 'Team', gradient: 'linear-gradient(135deg,#1565C0,#1E88E5)', size: 'normal' },
    { id: '9', label: 'Dr. Rahul Mehta', category: 'Team', gradient: 'linear-gradient(135deg,#00ACC1,#5E35B1)', size: 'normal' },
    { id: '10', label: 'Waiting Lounge', category: 'Clinic', gradient: 'linear-gradient(135deg,#1E88E5,#00ACC1)', size: 'tall' },
    { id: '11', label: '3D Cone-Beam CT', category: 'Equipment', gradient: 'linear-gradient(135deg,#5E35B1,#00897B)', size: 'normal' },
    { id: '12', label: 'Pediatric Zone', category: 'Clinic', gradient: 'linear-gradient(135deg,#00897B,#1565C0)', size: 'normal' }
  ];

  filteredItems = computed(() => {
    const filter = this.activeFilter();
    return filter === 'All'
      ? this.allItems
      : this.allItems.filter(i => i.category === filter);
  });

  setFilter(filter: string): void {
    this.activeFilter.set(filter);
    setTimeout(() => this.initScrollAnimations(), 50);
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
      { threshold: 0.05 }
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.remove('visible');
      observer.observe(el);
    });
  }
}

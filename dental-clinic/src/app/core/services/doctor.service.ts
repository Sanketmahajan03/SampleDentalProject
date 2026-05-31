import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Doctor } from '../models/doctor.model';
import { MOCK_DOCTORS } from '../mock-data';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private http = inject(HttpClient);

  getAllDoctors(): Observable<Doctor[]> {
    if (!environment.apiUrl) {
      return of(MOCK_DOCTORS);
    }
    return this.http.get<Doctor[]>(`${environment.apiUrl}/doctors`).pipe(
      catchError(() => of(MOCK_DOCTORS))
    );
  }

  getDoctorById(id: string): Observable<Doctor | undefined> {
    if (!environment.apiUrl) {
      return of(MOCK_DOCTORS.find(d => d.id === id));
    }
    return this.http.get<Doctor>(`${environment.apiUrl}/doctors/${id}`).pipe(
      catchError(() => of(MOCK_DOCTORS.find(d => d.id === id)))
    );
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Appointment } from '../models/appointment.model';
import { MOCK_TIME_SLOTS } from '../mock-data';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private http = inject(HttpClient);

  bookAppointment(appointment: Omit<Appointment, 'id' | 'status'>): Observable<Appointment> {
    if (!environment.apiUrl) {
      const saved: Appointment = {
        ...appointment,
        id: crypto.randomUUID(),
        status: 'pending'
      };
      const existing: Appointment[] = JSON.parse(
        localStorage.getItem('smilecare_appointments') ?? '[]'
      );
      localStorage.setItem('smilecare_appointments', JSON.stringify([...existing, saved]));
      return of(saved);
    }
    const fallback: Appointment = {
      ...appointment,
      id: crypto.randomUUID(),
      status: 'pending'
    };
    return this.http.post<Appointment>(`${environment.apiUrl}/appointments`, appointment).pipe(
      catchError(() => of(fallback))
    );
  }

  getAppointments(): Observable<Appointment[]> {
    if (!environment.apiUrl) {
      const stored: Appointment[] = JSON.parse(
        localStorage.getItem('smilecare_appointments') ?? '[]'
      );
      return of(stored);
    }
    return this.http.get<Appointment[]>(`${environment.apiUrl}/appointments`).pipe(
      catchError(() => of([]))
    );
  }

  getAvailableSlots(doctorId: string, date: string): Observable<string[]> {
    if (!environment.apiUrl) {
      return of(MOCK_TIME_SLOTS);
    }
    return this.http.get<string[]>(
      `${environment.apiUrl}/appointments/slots?doctorId=${doctorId}&date=${date}`
    ).pipe(
      catchError(() => of(MOCK_TIME_SLOTS))
    );
  }
}

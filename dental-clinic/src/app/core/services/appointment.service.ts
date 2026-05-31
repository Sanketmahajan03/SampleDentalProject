import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Appointment } from '../models/appointment.model';
import { MOCK_TIME_SLOTS } from '../mock-data';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private http = inject(HttpClient);

  bookAppointment(appointment: Omit<Appointment, 'id' | 'status'>): Observable<Appointment> {
    if (!environment.apiUrl) {
      // TODO: replace with API call when backend is ready
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
    return this.http.post<Appointment>(`${environment.apiUrl}/appointments`, appointment);
  }

  getAppointments(): Observable<Appointment[]> {
    if (!environment.apiUrl) {
      // TODO: replace with API call when backend is ready
      const stored: Appointment[] = JSON.parse(
        localStorage.getItem('smilecare_appointments') ?? '[]'
      );
      return of(stored);
    }
    return this.http.get<Appointment[]>(`${environment.apiUrl}/appointments`);
  }

  getAvailableSlots(doctorId: string, date: string): Observable<string[]> {
    if (!environment.apiUrl) {
      // TODO: replace with API call when backend is ready
      return of(MOCK_TIME_SLOTS);
    }
    return this.http.get<string[]>(
      `${environment.apiUrl}/appointments/slots?doctorId=${doctorId}&date=${date}`
    );
  }
}

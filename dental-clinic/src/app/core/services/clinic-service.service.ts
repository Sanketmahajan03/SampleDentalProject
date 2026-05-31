import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ClinicService } from '../models/service.model';
import { MOCK_SERVICES } from '../mock-data';

@Injectable({ providedIn: 'root' })
export class ClinicServiceService {
  private http = inject(HttpClient);

  getAllServices(): Observable<ClinicService[]> {
    if (!environment.apiUrl) {
      return of(MOCK_SERVICES);
    }
    return this.http.get<ClinicService[]>(`${environment.apiUrl}/services`).pipe(
      catchError(() => of(MOCK_SERVICES))
    );
  }
}

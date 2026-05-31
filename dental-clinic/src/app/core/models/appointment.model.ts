export interface Appointment {
  id: string;
  patientName: string;
  email: string;
  phone: string;
  service: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

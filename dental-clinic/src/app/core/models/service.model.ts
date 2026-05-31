export interface ClinicService {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: string;    // display string e.g. "₹500 – ₹1,500"
  icon: string;     // emoji identifier
}

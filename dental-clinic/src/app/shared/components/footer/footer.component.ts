import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PhoneFormatPipe } from '../../pipes/phone-format.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, PhoneFormatPipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  readonly quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Our Doctors', path: '/doctors' },
    { label: 'Book Appointment', path: '/appointments' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' }
  ];

  readonly phone = '9876543210';
  readonly email = 'info@smilecare.in';
  readonly address = '123, Shivaji Nagar, Near FC Road, Pune – 411005, Maharashtra';

  readonly workingHours = [
    { day: 'Monday – Friday', hours: '9:00 AM – 7:00 PM' },
    { day: 'Saturday', hours: '9:00 AM – 5:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];
}

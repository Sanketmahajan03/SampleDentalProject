import { Doctor } from './models/doctor.model';
import { ClinicService } from './models/service.model';

export interface Testimonial {
  id: string;
  name: string;
  treatment: string;
  rating: number;
  comment: string;
  location: string;
}

// TODO: Remove when API is ready
export const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    specialization: 'Orthodontist',
    experience: 12,
    bio: 'Dr. Priya specializes in corrective teeth alignment and braces, helping patients achieve beautifully aligned smiles using the latest orthodontic techniques including clear aligners.',
    imageUrl: '',
    available: true
  },
  {
    id: '2',
    name: 'Dr. Rahul Mehta',
    specialization: 'Oral Surgeon',
    experience: 8,
    bio: 'Dr. Rahul is an expert in complex oral surgeries, tooth extractions, and dental implants, ensuring painless procedures with rapid and comfortable recovery.',
    imageUrl: '',
    available: true
  },
  {
    id: '3',
    name: 'Dr. Sneha Joshi',
    specialization: 'Pediatric Dentist',
    experience: 6,
    bio: 'Dr. Sneha creates a fun, stress-free environment for children, specializing in preventive care, early dental development, and building positive dental habits from a young age.',
    imageUrl: '',
    available: false
  },
  {
    id: '4',
    name: 'Dr. Amit Desai',
    specialization: 'General Dentist',
    experience: 15,
    bio: 'With 15 years of experience, Dr. Amit provides comprehensive dental care including thorough cleanings, composite fillings, crown placements, and preventive treatments.',
    imageUrl: '',
    available: true
  }
];

// TODO: Remove when API is ready
export const MOCK_SERVICES: ClinicService[] = [
  {
    id: '1',
    name: 'General Dentistry',
    description: 'Comprehensive oral health exams, professional cleanings, composite fillings, and preventive care to keep your smile healthy and strong for years to come.',
    duration: 60,
    price: '₹500 – ₹2,000',
    icon: '🦷'
  },
  {
    id: '2',
    name: 'Orthodontics',
    description: 'Traditional metal braces, ceramic braces, and clear aligners (Invisalign) to straighten teeth and correct bite issues for both children and adults.',
    duration: 45,
    price: '₹15,000 – ₹60,000',
    icon: '😁'
  },
  {
    id: '3',
    name: 'Teeth Whitening',
    description: 'Professional in-office power whitening and customized take-home bleaching kits to brighten your smile by up to 8 shades in just one session.',
    duration: 90,
    price: '₹3,000 – ₹8,000',
    icon: '✨'
  },
  {
    id: '4',
    name: 'Root Canal Treatment',
    description: 'Pain-free root canal therapy using rotary endodontics to save severely damaged or infected teeth, relieve discomfort, and restore full function.',
    duration: 90,
    price: '₹4,000 – ₹12,000',
    icon: '🩺'
  },
  {
    id: '5',
    name: 'Dental Implants',
    description: 'Permanent titanium tooth replacements that look, feel, and function like natural teeth. Includes single implants, implant-supported bridges, and full-arch restorations.',
    duration: 120,
    price: '₹25,000 – ₹80,000',
    icon: '⚙️'
  },
  {
    id: '6',
    name: 'Pediatric Dentistry',
    description: 'Child-friendly dental care including sealants, fluoride treatments, space maintainers, and age-appropriate education to build lifelong oral health habits.',
    duration: 45,
    price: '₹500 – ₹3,000',
    icon: '👶'
  }
];

// TODO: Remove when API is ready
export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Prachi Kulkarni',
    treatment: 'Orthodontics',
    rating: 5,
    comment: 'SmileCare completely transformed my smile. Dr. Priya was incredibly patient and explained every step of my braces treatment. I am so happy with the final results!',
    location: 'Koregaon Park, Pune'
  },
  {
    id: '2',
    name: 'Rohan Deshmukh',
    treatment: 'Dental Implants',
    rating: 5,
    comment: 'I was very anxious about getting an implant but Dr. Rahul made the entire procedure completely painless. The implant looks and feels just like my natural tooth. Highly recommend!',
    location: 'Kothrud, Pune'
  },
  {
    id: '3',
    name: 'Meera Patil',
    treatment: 'Teeth Whitening',
    rating: 5,
    comment: 'Excellent service and very professional staff. My teeth are 6 shades whiter after just one session! The clinic is spotlessly clean and the equipment is state-of-the-art.',
    location: 'Baner, Pune'
  }
];

// TODO: Remove when API is ready
export const MOCK_TIME_SLOTS: string[] = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM'
];

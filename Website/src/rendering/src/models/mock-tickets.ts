import { Ticket } from './ticket';

export const TICKETS: Ticket[] = [
  {
    id: '0',
    name: 'Online Ticket',
    pass: 'Digital Pass',
    price: 99,
    color: 'pink',
    benefits: [
      'Digital Pass',
      'Access to all online sessions',
      '10% off all digital vendor goods',
      'Free online sessions after the event',
      'Digital ticket only',
      'Unlimited customize your agenda',
    ],
  },
  {
    id: '1',
    name: 'Regular Ticket',
    pass: 'Standard Pass',
    price: 199,
    color: 'orange',
    benefits: [
      'Standard pass',
      'Access to all online and in-person sessions',
      '10% off all vendor goods',
      'Free online sessions after the event',
      'Print and digital ticket',
      'Unlimited customize your agenda',
    ],
  },
  {
    id: '2',
    name: 'VIP Ticket',
    pass: 'All access VIP pass',
    price: 399,
    color: 'blue',
    benefits: [
      'All access VIP pass',
      'VIP access to exclusive workshops and special keynotes',
      '20% off all vendor goods',
      'Free online sessions after the event',
      'Print and digital ticket',
      'Unlimited customize your agenda',
    ],
  },
];

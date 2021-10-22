import { Ticket } from './ticket';

export const TICKETS: Ticket[] = [
  {
    id: '0',
    name: 'Online Ticket',
    pass: 'Digital Pass',
    price: 99,
    color: 'pink',
    benefits: [
      'Access to all online sessions',
      '10% off all digital vendor goods',
      'Digital ticket only',
    ],
  },
  {
    id: '1',
    name: 'Regular Ticket',
    pass: 'Standard Pass',
    price: 199,
    color: 'orange',
    benefits: [
      'Access to all online and in-person sessions',
      '10% off all vendor goods',
      'Print and digital ticket',
    ],
  },
  {
    id: '2',
    name: 'VIP Ticket',
    pass: 'All Access VIP Pass',
    price: 399,
    color: 'blue',
    benefits: [
      'VIP access to exclusive workshops and special keynotes',
      '20% off all vendor goods',
      'Print and digital ticket',
    ],
  },
];

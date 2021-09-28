import { Ticket } from './ticket';

export const TICKETS: Ticket[] = [
  {
    id: '0',
    name: 'Online Ticket',
    pass: 'Digital Pass',
    price: '99$',
    thumbnail: '/tickets/ticket1.jpg',
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
    price: '199$',
    thumbnail: '/tickets/ticket2.jpg',
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
    pass: 'All access VIP pass',
    price: '399$',
    thumbnail: '/tickets/ticket3.jpg',
    color: 'blue',
    benefits: [
      'VIP access and special keynotes',
      '20% off all vendor goods',
      'Print and digital ticket',
    ],
  },
];

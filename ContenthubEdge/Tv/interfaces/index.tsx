export interface venueDataI {
  venues: venueI[];
  preview: boolean;
}

export interface venueI {
  id: string;
  name: string;
  description: string;
  rooms: roomI[];
  slug: string;
}

export interface roomI {
  id: string;
  name: string;
  description: string;
  timeslots: timeslotI[];
}

export interface timeslotI {
  id: string;
  name: string;
}

export interface dataI {
  venues: venueI[];
  preview: boolean;
  slug: string;
}

export interface eventI{
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  city: cityI;
  days: dayI[];
}

export interface cityI{
  id: string;
  name: string;
}

export interface dayI{
  id: string;
  name: string;
  session: sessionI[];
 }

export interface sessionI{
  id: string;
  name: string;
  description: string;
  room: roomI;
}

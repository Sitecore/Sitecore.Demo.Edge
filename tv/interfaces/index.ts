export interface Blog {
  id: string;
  blog_Title: string;
  blog_Quote: string;
  blog_Body: string;
}

export interface Session {
  id: string;
  name: string;
  description: string;
  room: string;
  timeslot: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  timeslots: Timeslot[];
}

export interface Timeslot {
  id: string;
  name: string;
}
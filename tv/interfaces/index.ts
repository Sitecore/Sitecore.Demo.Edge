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
  sortOrder: number;
}

export interface Room {
  id: string;
  name: string;
}

export interface Speaker {
  id: string;
  name: string;
  description: string;
}

export interface Timeslot {
  id: string;
  name: string;
}

export interface Blog {
  id: string;
  blog_Title: string;
  blog_Quote: string;
  blog_Body: string;
}

export interface Speaker {
  id: string;
  name: string;
  photo: string;
  description: string;
  image: any;
}

export interface Timeslot {
  id: string;
  name: string;
}

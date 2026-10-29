export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  contact: string;
  gender: "male" | "female";
  dateOfBirth: string;
  age: number;
  bloodGroup: string;
  avatar: string;
  occupation: string;
  company: string;
  department: string;
  salary: number;
  street: string;
  city: string;
  country: string;
  zipCode: string;
  website: string;
  role: "admin" | "editor" | "user";
  isActive: boolean;
  joinedAt: string;
  skills: string[];
  bio: string;
}

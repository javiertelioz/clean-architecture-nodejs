import { Gender } from './types/gender';

export class User {
  id?: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  picture?: string;
  gender?: Gender;

  constructor(
    id: number | string,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    gender: Gender,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.gender = gender;
  }
}

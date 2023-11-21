import { IsString, Length, IsNotEmpty, IsEmail } from 'class-validator';

export default class Login {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  password: string;
}

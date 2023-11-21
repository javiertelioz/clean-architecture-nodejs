import { IsIn, IsString, Length, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUser {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail(undefined)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;

  @IsString()
  @IsIn(['male', 'female'])
  gender: string;
}

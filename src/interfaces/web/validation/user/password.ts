import { ValidateIf, IsString, Length, IsNotEmpty, Matches, IsPositive } from 'class-validator';

export class UpdateUserPassword {
  @IsNotEmpty()
  @IsPositive()
  @Length(6, 12)
  code: number;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.password === o.repeatPassword)
  repeatPassword: string;
}

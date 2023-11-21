import { IsDefined, IsIn, IsString, ValidateIf, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUser {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.firstName)
  firstName?: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ValidateIf(o => o.lastName)
  lastName?: string;

  @IsDefined()
  @ValidateIf(o => o.email)
  @IsEmail()
  email?: string;

  @IsDefined()
  @IsString()
  @ValidateIf(o => o.gender)
  @IsIn(['male', 'female'])
  gender?: string;
}

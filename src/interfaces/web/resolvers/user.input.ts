import { IsEmail, MaxLength } from 'class-validator';
import { ObjectType, InputType, Field, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field({
    nullable: true,
  })
  phone: string;

  @Field({
    nullable: true,
  })
  gender: string;
}

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(30)
  firstName: string;

  @Field()
  @MaxLength(30)
  lastName: string;

  @Field()
  @IsEmail()
  email?: string;

  @Field()
  @MaxLength(10)
  password: string;

  @Field()
  gender: string;
}

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  @MaxLength(30)
  firstName: string;

  @Field({ nullable: true })
  @MaxLength(30)
  lastName: string;

  @Field({ nullable: true })
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  gender: string;
}

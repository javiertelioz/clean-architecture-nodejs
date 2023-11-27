import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Hello {
  @Field()
  message: string;
}

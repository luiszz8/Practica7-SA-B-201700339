import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMetodoInput {
  @Field()
  numero: string;

  @Field()
  cliente: string;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductoInput {
  @Field()
  nombre: string;

  @Field()
  cantidad: number;

  @Field()
  precio: number;
}

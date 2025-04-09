import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductoService } from './producto.service';
import { Producto } from './producto.entity';
import { CreateProductoInput } from './dto/crear-producto.input';

@Resolver()
export class ProductoResolver {
  constructor(private productoService: ProductoService) {}

  @Query(() => [Producto])
  productos() {
    return this.productoService.findAll();
  }

  @Mutation(() => Producto)
  crearProducto(@Args('ProductoInput') productoInput: CreateProductoInput) {
    return this.productoService.crearProducto(productoInput);
  }
}

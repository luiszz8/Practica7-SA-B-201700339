import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { CreateProductoInput } from './dto/crear-producto.input';

@Injectable()
export class ProductoService {
    constructor(
        @InjectRepository(Producto) private productoRepository: Repository<Producto>,
      ) {}

      async findAll(): Promise<Producto[]> {
        return await this.productoRepository.find();
      }
    
      crearProducto(producto: CreateProductoInput): Promise<Producto> {
        const newProducto = this.productoRepository.create(producto);
        return this.productoRepository.save(newProducto);
      }
}

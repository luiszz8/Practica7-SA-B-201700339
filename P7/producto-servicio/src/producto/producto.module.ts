import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoResolver } from './producto.resolver';
import { Producto } from './producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Producto])],
  providers: [ProductoService, ProductoResolver]
})
export class ProductoModule {}

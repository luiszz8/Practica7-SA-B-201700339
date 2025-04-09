import { Module } from '@nestjs/common';
import { MetodoService } from './metodo.service';
import { MetodoResolver } from './metodo.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metodo } from './metodo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Metodo])],
  providers: [MetodoService, MetodoResolver]
})
export class MetodoModule {}

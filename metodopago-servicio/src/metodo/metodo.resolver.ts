import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MetodoService } from './metodo.service';
import { Metodo } from './metodo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetodoInput } from './dto/crear-metodo.input';

@Resolver()
export class MetodoResolver {
  constructor(private metodoService: MetodoService) {}

  @Query(() => [Metodo])
  metodos() {
    return this.metodoService.findAll();
  }

  @Mutation(() => Metodo)
  crearMetodo(@Args('MetodoInput') metodoInput: CreateMetodoInput) {
    return this.metodoService.crearMetodo(metodoInput);
  }
}

import { Injectable } from '@nestjs/common';
import { Metodo } from './metodo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetodoInput } from './dto/crear-metodo.input';

@Injectable()
export class MetodoService {
  constructor(
    @InjectRepository(Metodo) private metodoRepository: Repository<Metodo>,
  ) {}

  async findAll(): Promise<Metodo[]> {
    return await this.metodoRepository.find();
  }

  crearMetodo(metodo: CreateMetodoInput): Promise<Metodo> {
    const newMetodo = this.metodoRepository.create(metodo);
    return this.metodoRepository.save(newMetodo);
  }
}

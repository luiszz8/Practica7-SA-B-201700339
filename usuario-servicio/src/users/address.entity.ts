import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'address' })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  direccion: string;

  @ManyToOne(() => User, (user) => user.direcciones, { onDelete: 'CASCADE' })
  usuario: User;
}

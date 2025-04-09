import { Entity, Column, PrimaryColumn, BeforeInsert, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Address } from './address.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryColumn({ type: 'char', length: 36 })
  id_usuario: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  correo_electronico: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  contrasena: string;

  @Column()
  telefono: string;

  @Column()
  departamento: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column()
  sexo: string;

  @Column({ nullable: true })
  foto: string;

  @Column({ type: 'int', default: 2 })
  estado: number;

  @Column({ type: 'int', default: 1 })
  rol: number;

  @OneToMany(() => Address, (address) => address.usuario, { cascade: true })
  direcciones: Address[];

  @BeforeInsert()
  generateUUID() {
    this.id_usuario = uuidv4(); // Genera un UUID antes de insertar tipo uuid
  }
}

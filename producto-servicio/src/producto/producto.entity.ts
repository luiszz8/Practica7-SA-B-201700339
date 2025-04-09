import {ObjectType, Field} from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ name: 'producto' })
@ObjectType()
export class Producto {
    @PrimaryGeneratedColumn()
    @Field()
    id:string;

    @Column()
    @Field()
    nombre: string;

    @Column()
    @Field()
    cantidad: number;

    @Column()
    @Field()
    precio: number;
}
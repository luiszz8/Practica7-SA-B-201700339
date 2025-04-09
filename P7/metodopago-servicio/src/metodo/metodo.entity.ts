import {ObjectType, Field} from '@nestjs/graphql'
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({ name: 'metodo' })
@ObjectType()
export class Metodo {
    @PrimaryGeneratedColumn()
    @Field()
    id:string;

    @Column()
    @Field()
    numero: string;

    @Column()
    @Field()
    cliente: string;
}
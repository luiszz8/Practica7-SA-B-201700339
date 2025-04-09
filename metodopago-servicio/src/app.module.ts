import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetodoModule } from './metodo/metodo.module';
import { GraphQLModule } from '@nestjs/graphql'
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo'
import {join} from 'path'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/graphql-metodos',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'metodo_p4',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true 
    }),
    MetodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

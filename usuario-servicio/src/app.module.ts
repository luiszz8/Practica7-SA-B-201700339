import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'usuario_p',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true 
  }),UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

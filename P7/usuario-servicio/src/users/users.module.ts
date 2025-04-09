import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Address } from './address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Address]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    global: true,
    secret: 'secreto1234',
    signOptions: { expiresIn: '1h' },
  })
],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy]
})
export class UsersModule {}

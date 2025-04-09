import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies?.jwt; 

    if (!token) {
      throw new UnauthorizedException('Token no encontrado');
    }

    try {
      const decoded = this.jwtService.verify(token); 
      request.user = decoded.payload; 
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}

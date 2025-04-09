import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { loginUserDTO } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EditUserDTO } from './dto/edit-user.dto';
import { Address } from './address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Address) private addressRepository: Repository<Address>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDTO) {
    const userD = await this.userRepository.findOne({ where: { username:user.username } });
    if (userD) {
      throw new NotFoundException('Datos incorrectos');
    }

    const hashedPassword = await bcrypt.hash(user.contrasena, 10);
    const newUser = this.userRepository.create({
      ...user,
      contrasena: hashedPassword,
    });
    const savedUser = await this.userRepository.save(newUser);

    // Guardar direcciones si se proporcionan
    if (user.direccion) {
      const addressEntity = this.addressRepository.create({
        direccion: user.direccion,
        usuario: savedUser, // Relación con el usuario recién creado
      });

      await this.addressRepository.save(addressEntity);
    }
    return savedUser;
  }

  async updateUser(userE: EditUserDTO) {
    const username = userE.username;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Actualizar solo los campos permitidos
    if (userE.correo_electronico) user.correo_electronico = userE.correo_electronico;
    if (userE.telefono) user.telefono = userE.telefono;
    //if (userE.direccion) user.direccion = userE.direccion;

    return this.userRepository.save(user);
  }

  async login(credenciales: loginUserDTO) {
    const username = credenciales.username;
    const contrasena = credenciales.contrasena;
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new NotFoundException('Datos incorrectos');
    }

    const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Datos incorrectos');
    }

    const payload = {id_usuario:user.id_usuario,username:user.username}
    const token = this.jwtService.sign({payload})
    return  token ;
  }
}

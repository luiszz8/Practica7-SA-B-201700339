import { Controller, Post, Body, UseGuards, Res, Req, Get } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { loginUserDTO } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';
import { EditUserDTO } from './dto/edit-user.dto';

@ApiBearerAuth()
@ApiTags('Usuario')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  
  @Post('register')
  createUser(@Body() newUser: CreateUserDTO) {
    return this.usersService.createUser(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register_adm')
  createUserAdm(@Body() newUser: CreateUserDTO) {
    return this.usersService.createUser(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  @UseGuards(JwtAuthGuard) 
  async updateUser(@Req() req, @Body() updateData:EditUserDTO) {
    const username = req.user.username; 
    updateData = { ...updateData, username: username};
    return this.usersService.updateUser(updateData);
  }

  @Post('login')
  async loginUser(@Body() dataUser: loginUserDTO, @Res() res: Response) {

    const dato = await this.usersService.login(dataUser);
    res.cookie('jwt', dato, {
      httpOnly: true,  
      secure: false, 
      sameSite: 'strict', 
    });

    return res.send({ message: 'Logged in' });
  }

  @Get('logout')
  logout(@Res() res: Response) {
    res.clearCookie('jwt');
    return res.send({ message: 'Logged out' });
  }
}
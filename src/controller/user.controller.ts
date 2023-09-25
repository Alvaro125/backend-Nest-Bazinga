import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  HttpCode,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/dto/createUserDTO';
import { LoginDto } from 'src/dto/loginDTO';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/service/user.service';

@Controller('api/user')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  findAll(@Req() req: Request): Promise<User[]> {
    console.log(req['user']);
    return this.userService.getAll();
  }

  @Post('/register')
  @HttpCode(204)
  register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.register(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Delete('/:id')
  deleteId(@Param('id') id: string) {
    return this.userService.deleteId(id);
  }
}

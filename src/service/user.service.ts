import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/createUserDTO';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/dto/loginDTO';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto) {
    try {
      const user = await this.userModel
        .findOne({ email: loginDto.email })
        .exec();
      if (!user) {
        throw new Error(`${HttpStatus.FORBIDDEN}:User not found`);
      }
      const isMatch = await bcrypt.compare(loginDto.password, user.password);
      if (isMatch) {
        const payload = { sub: user.id, username: user.name };
        return {
          auth: true,
          token: await this.jwtService.signAsync(payload),
        };
      } else {
        throw new Error(
          `${HttpStatus.FORBIDDEN}:Usuario não cadastrado ou senha inválida`,
        );
      }
    } catch (error) {
      const props = error.message.split(':');
      throw new HttpException(
        {
          status: props[0],
          error: props[1],
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
  async deleteId(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }
  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async register(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      process.env.SALT,
    );
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}

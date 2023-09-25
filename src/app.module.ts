import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './module/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PostsModule } from './module/post.module';
import { UploadModule } from './module/upload.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:bazinga123@cluster0.acmsr.mongodb.net/bazinga?retryWrites=true&w=majority',
    ),
    UsersModule,
    PostsModule,
    UploadModule,
    ConfigModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
})
export class AppModule {}

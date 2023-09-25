import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from 'src/controller/user.controller';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserService } from 'src/service/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'api/user/login', method: RequestMethod.POST },
        { path: 'api/user/register', method: RequestMethod.POST },
      )
      .forRoutes(UsersController);
  }
}

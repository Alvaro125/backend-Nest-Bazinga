import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController } from 'src/controller/upload.controller';
import { LoggerMiddleware } from 'src/middleware/logger.middleware';
import { Image, ImageSchema } from 'src/schemas/images.schema';
import { UploadService } from 'src/service/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UploadController);
  }
}

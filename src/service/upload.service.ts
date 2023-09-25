import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as AWS from 'aws-sdk';
import { Model } from 'mongoose';
import { Image } from 'src/schemas/images.schema';

@Injectable()
export class UploadService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}
  AWS_S3_BUCKET = 'bazingaweb';
  s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  });

  async uploadFile(file, idUser) {
    const createdImage = new this.imageModel({
      url: '',
      id_creator: idUser,
    });
    const img = await createdImage.save();
    const originalname = img['_id'];

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'sa-east-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}

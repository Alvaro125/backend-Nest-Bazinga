import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PostDto {
  @ApiProperty()
  url: string;
  @ApiProperty()
  @IsNotEmpty()
  content: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommnetDto {
  @ApiProperty()
  @IsNotEmpty()
  content: string;
}

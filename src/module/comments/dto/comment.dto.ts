import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class AddCommentDto {
  @ApiProperty()
  @IsNumber()
  packageId: number;

  @ApiProperty()
  @IsString()
  content: string;
}
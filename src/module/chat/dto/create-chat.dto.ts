import { ApiProperty } from '@nestjs/swagger';

export class CreateChatMessageDto {
  @ApiProperty({ description: 'Id of the sender' })
  senderId: number;

  @ApiProperty({ description: 'Id of the receiver' })
  receiverId: number;

  @ApiProperty({ description: 'Your question or answer'})
  content: string;
  }
  
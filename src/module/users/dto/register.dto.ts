import { IsString, IsEmail, IsNotEmpty, MinLength, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class RegisterDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(25)
  @Matches(/^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, { message: 'password must contain at least one special character' })
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  lastName: string;
}

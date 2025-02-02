import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
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
}

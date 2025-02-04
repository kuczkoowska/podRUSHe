import { IsString, IsEmail, IsNotEmpty, MinLength, Matches, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class RegisterDto {
  /**
   * DTO for user registration.
   * 
   * @property {string} username - The username of the user.
   * @decorator `@ApiProperty` - Describes the username property for API documentation.
   * @decorator `@IsString` - Ensures the username is a string.
   * @decorator `@IsNotEmpty` - Ensures the username is not empty.
   * @decorator `@MaxLength(30)` - Ensures the username does not exceed 30 characters.
   */
  @ApiProperty({ description: 'Create your username' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  username: string;

  @ApiProperty( {description: 'Create your password'})
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

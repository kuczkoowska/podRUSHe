import { IsString, MaxLength, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ required: false, nullable: true })
    @ValidateIf((o) => o.username !== undefined)
    @IsString()
    @MaxLength(30)
    username?: string;

    @ApiProperty({ required: false, nullable: true })
    @ValidateIf((o) => o.firstName !== undefined)
    @IsString()
    @MaxLength(30)
    firstName?: string;

    @ApiProperty({ required: false, nullable: true })
    @ValidateIf((o) => o.lastName !== undefined)
    @IsString()
    @MaxLength(50)
    lastName?: string;
}
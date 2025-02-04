import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class BookingUpdateDto {

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MaxLength(200)
    numberOfTravelers: number;

}
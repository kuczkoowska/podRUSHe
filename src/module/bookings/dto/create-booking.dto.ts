import { IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDto {
  @ApiProperty()
  @IsInt()
  packageId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  numberOfTravelers: number;
}

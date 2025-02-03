import { ApiProperty } from '@nestjs/swagger';

export class FilterPackageDto {
    @ApiProperty({ required: false, description: 'Destination of the package' })
    destination?: string;

    @ApiProperty({ required: false, description: 'Minimum price of the package' })
    minPrice?: string;

    @ApiProperty({ required: false, description: 'Maximum price of the package' })
    maxPrice?: string;

    @ApiProperty({ required: false, description: 'Start date of the package' })
    startDate?: string;

    @ApiProperty({ required: false, description: 'End date of the package' })
    endDate?: string;
}
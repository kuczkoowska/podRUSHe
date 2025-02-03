import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { Package } from './package.entity';
import { PackageDto } from './dto/package.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  createPackage(@Body() packageDto: PackageDto) {
    return this.packagesService.create(packageDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Package> {
    return this.packagesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() packageData: Partial<Package>): Promise<Package> {
    return this.packagesService.update(id, packageData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.packagesService.remove(id);
  }

  @Get()
  async findAll(@Query() filters: any): Promise<Package[]> {
    if (Object.keys(filters).length === 0) {
      // If no filters return all packages
      return this.packagesService.findAll();
    }
    return this.packagesService.findAllWithFilters(filters);
  }
}

import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { Package } from './package.entity';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post()
  create(@Body() packageData: Partial<Package>): Promise<Package> {
    return this.packagesService.create(packageData);
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

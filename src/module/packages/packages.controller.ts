import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { Package } from './package.entity';
import { PackageDto } from './dto/package.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PackageUpdateDto } from './dto/update-package.dto';
import { FilterPackageDto } from './dto/filter-package.dto';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create package' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  createPackage(@Body() packageDto: PackageDto) {
    return this.packagesService.create(packageDto);
  }

  @ApiOperation({ summary: 'Get by id' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Package> {
    return this.packagesService.findOne(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update package' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Put()
  update(@Param('id') id: number, @Body() packageData: Partial<PackageUpdateDto>): Promise<Package> {
    return this.packagesService.update(+id, packageData);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete package' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.packagesService.remove(id);
  }

  @ApiOperation({ summary: 'Filter packages' })
  @Get()
  async findAll(@Query() filters: FilterPackageDto): Promise<Package[]> {
    if (Object.keys(filters).length === 0) {
      return this.packagesService.findAll();
    }
    return this.packagesService.findAllWithFilters(filters);
  }
}

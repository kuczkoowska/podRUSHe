import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package.entity';
import { FilterPackageDto } from './dto/filter-package.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private packagesRepository: Repository<Package>,
  ) {}

  async create(packageData: Partial<Package>): Promise<Package> {
    const newPackage = this.packagesRepository.create(packageData);
    return this.packagesRepository.save({
      ...packageData,
      startDate: new Date(`${packageData.startDate}T00:00:00.000Z`), // Append time to make it a valid Date
      endDate: new Date(`${packageData.endDate}T00:00:00.000Z`), 
    });

  }

  async findAll(): Promise<Package[]> {
    return this.packagesRepository.find();
  }

  async findOne(id: number): Promise<Package> {
    const packageItem = await this.packagesRepository.findOne({ where: { id } });
    if (!packageItem) throw new NotFoundException('Package not found');
    return packageItem;
  }

  async update(id: number, packageData: Partial<Package>): Promise<Package> {
    await this.packagesRepository.update(id, packageData);
    return this.packagesRepository.findOne({ where: { id } });
  }
  
  async remove(id: number): Promise<void> {
    await this.packagesRepository.delete(id);
  }

  async findAllWithFilters(filters: FilterPackageDto): Promise<Package[]> {
    const queryBuilder = this.packagesRepository.createQueryBuilder('package');
    
    if (filters.destination) {
      queryBuilder.andWhere('LOWER(package.destination) LIKE LOWER(:destination)', 
        { destination: `%${filters.destination}%` });
    }
    
    if (filters.minPrice) {
      queryBuilder.andWhere('package.price >= :minPrice', 
        { minPrice: parseFloat(filters.minPrice) });
    }
  
    if (filters.maxPrice) {
      queryBuilder.andWhere('package.price <= :maxPrice', 
        { maxPrice: parseFloat(filters.maxPrice) });
    }
      
    if (filters.startDate) {
      queryBuilder.andWhere('package.startDate >= :startDate', 
        { startDate: filters.startDate });
    }
  
    if (filters.endDate) {
      queryBuilder.andWhere('package.endDate <= :endDate', 
        { endDate: filters.endDate });
    }
          
    return queryBuilder.getMany();
  }
}

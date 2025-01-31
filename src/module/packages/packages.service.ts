import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private packagesRepository: Repository<Package>,
  ) {}

  async create(packageData: Partial<Package>): Promise<Package> {
    const newPackage = this.packagesRepository.create(packageData);
    return this.packagesRepository.save(newPackage);
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
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.packagesRepository.delete(id);
  }
}

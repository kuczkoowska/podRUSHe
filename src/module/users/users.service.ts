import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(user: RegisterDto): Promise<User> {
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedData = Object.fromEntries(
      Object.entries(updateUserDto).filter(([_, v]) => v !== undefined)
    );

    Object.assign(user, updatedData);
    return this.usersRepository.save(user);
}

  async remove(id: number): Promise<void> {
    console.log('Removing user with ID:', id);

    const result = await this.usersRepository.delete(id);
    
    if (result.affected === 0) {
        throw new NotFoundException('User not found');
    }
    
    console.log('User deleted successfully');
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { id },
      select: ['id', 'username', 'password', 'email', 'firstName', 'lastName'],
    });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'email', 'firstName', 'lastName'],
    });
  }
}


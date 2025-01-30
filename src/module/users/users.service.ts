import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//import * as bcrypt from 'bcryptjs';


import { User } from './user.entity';
//import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  // Create a new user with a hashed password
  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  // Retrieve all users
  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  // Find a user by ID 
  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });

  }

  // Update a user by ID
  async update(id: number, user: User): Promise<User> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOne({ where: { id } });

  }

  // Remove a user by ID
  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

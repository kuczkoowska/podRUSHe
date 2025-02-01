import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async register(username: string, password: string, email: string, firstName: string, lastName: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName
    });
    return this.usersRepository.save(user);
  }

  async create(user: RegisterDto): Promise<User> {
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async update(id: number, updateUserDto: Partial<RegisterDto>): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'email', 'firstName', 'lastName'],
    });
  }
  
  async findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
}


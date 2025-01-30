import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../users/dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from '../users/dto/sign-in.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto): Promise<any> {
        const { username, password, email, firstName, lastName } = registerDto;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.usersService.create({
            username,
            password: hashedPassword,
            email,
            firstName,
            lastName,
        });
        return user;
    }

    public async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findOne(username)

        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }

    async login(dto: SignInDto): Promise<any> {
        const { username, password } = dto;

        const user = await this.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { id: user.id, name: username, email: user.email };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken, user: payload };
    }

}
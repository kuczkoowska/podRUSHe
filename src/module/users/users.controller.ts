import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, UseGuards, Request, Patch, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Show user profile' })
  @Get('profile')
  async getProfile(@Request() req: { user: { id: number } }) {
    const user = await this.usersService.findOne(req.user.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
    };
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Update user profile' })
  async updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req
  ) {
    return this.usersService.update(+req.user.userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user profile' })
  @Delete()
  async remove(@Request() req: { user: { userId: number } }): Promise<void> {
      try {
          console.log('DELETE route hit!');
          console.log('Request User:', req.user);

          if (!req.user || !req.user.userId) {
              throw new UnauthorizedException('Invalid user credentials');
          }

          await this.usersService.remove(+req.user.userId);
          console.log('User deleted successfully');
      } catch (error) {
          console.error('Error in DELETE /users:', error);
          throw error;
      }
  }

}

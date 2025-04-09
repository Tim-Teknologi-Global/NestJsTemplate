import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../utils/guard/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../users/schemas/user.schema';
import {
  createUsersSchema,
  updateUsersSchema,
  getUsersSchema,
  getUsersByIdSchema,
  deleteUsersSchema,
} from './users.validator';
import { JoiValidationPipe } from 'src/utils/pipes/validation.pipes';
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * Create a new user
   * @param createUserDto {CreateUserDto}
   * @returns {User}
   */
  @Post()
  @UsePipes(new JoiValidationPipe(createUsersSchema))
  create(
    @Body()
    createUserDto: {
      email: string;
      password: string;
      username?: string;
    },
  ) {
    return this.usersService.create(createUserDto);
  }
  /**
   * Get all users
   * @param request {Request}
   * @returns {User[]}
   */
  @Get()
  @UsePipes(new JoiValidationPipe(getUsersSchema))
  findAll(@Req() request: Request) {
    // this is how you get the user from the request
    const user = request.user as User;
    return this.usersService.findAll();
  }
  /**
   * Get a single user by ID
   * @param id {string}
   * @returns {User}
   */
  @Get(':id')
  @UsePipes(new JoiValidationPipe(getUsersByIdSchema))
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
  /**
   * Update a single user by ID
   * @param id {string}
   * @param updateUserDto {UpdateUserDto}
   * @returns {User}
   */
  @Patch(':id')
  @UsePipes(new JoiValidationPipe(updateUsersSchema))
  update(
    @Param('id') id: string,
    @Body()
    updateUserDto: {
      email?: string;
      username?: string;
      password?: string;
    },
  ) {
    return this.usersService.update(id, updateUserDto);
  }
  /**
   * Delete a single user by ID
   * @param id {string}
   * @returns {User}
   */
  @Delete(':id')
  @UsePipes(new JoiValidationPipe(deleteUsersSchema))
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

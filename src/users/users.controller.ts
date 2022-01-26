import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/domain/dtos/create-user.dto';
import { IUser } from 'src/domain/interfaces/user';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDTO): Promise<IUser> {
    return await this.userService.create(user);
  }

  @Get('getRecipientBySenderId/:id')
  async getRecipientBySenderId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IUser> {
    return await this.userService.getRecipientBySenderId(id);
  }
}

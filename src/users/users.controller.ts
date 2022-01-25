import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/domain/dtos/users/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async create(@Body() user: CreateUserDTO) {
    return await this.userService.create(user);
  }

  @Get('getRecipientBySenderId/:id')
  async getRecipientBySenderId(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getRecipientBySenderId(id);
  }
}

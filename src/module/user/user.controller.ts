import { Body, Post, Get, Controller } from '@nestjs/common';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post() // rota post
  async create(@Body() data: UserDTO) {
    return this.userService.create(data);
  }

  @Get() // rota get
  async findAll() {
    return this.userService.findAll();
  }
}

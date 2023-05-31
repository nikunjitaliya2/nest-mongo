import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./users.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  // create one
  @Post("")
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  // find one
  @Get(":id")
  findById(@Param("id") id: string) {
    return this.usersService.findById(id);
  }

  // find All
  @Get("")
  findAll() {
    return this.usersService.findAll();
  }

  // update one
  @Patch(":id")
  update(@Param("id") id: string, @Body() data: UpdateUserDto) {
    return this.usersService.updateUser(id, data);
  }

  // delete user
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}

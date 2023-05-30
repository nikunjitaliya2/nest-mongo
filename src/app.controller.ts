import { Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { Request } from "express";

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getAll() {
  }

  @Post()
  async createUser(@Req() userData: Request)
  {
  }

  @Get()
  getUser(@Param() UserId: number) {
    return UserId
  }
  @Delete()
  DeleteUser(@Param() UserId: number) {
    return UserId
  }

}

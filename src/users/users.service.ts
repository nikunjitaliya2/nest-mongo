import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateUserDto } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async create(data: CreateUserDto): Promise<any> {
    return await this.prisma.user.create({ data }).then((res) => {
      return res;
    }).catch((err) => {
      if (err.code === "P2002") throw new ConflictException(data.email + "Email Already Exist.");
      throw new BadRequestException(err);
    });
  }

  async findAll(id): Promise<any> {
    const query = { where: { id } };
    console.log(query);
    return this.prisma.user.findMany(query).then((res) => {
      return res;
    }).catch((err) => {
      throw new BadRequestException(err);
    });
  }

}

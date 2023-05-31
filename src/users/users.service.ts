import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateUserDto, UpdateUserDto } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  async create(data: CreateUserDto): Promise<any> {
    return await this.prisma.user.create({ data }).then((res) => {
      return res;
    }).catch((err) => {
      if (err.code === "P2002") throw new ConflictException(data.email + " Email Already Exist.");
      throw new BadRequestException(err);
    });
  }

  async findById(id): Promise<any> {
    const query = { where: { id }};
    return this.prisma.user.findUnique(query).then((res) => {
      if(res.deletedAt !== null) throw new BadRequestException('user not found');
      return res;
    }).catch((err) => {
      console.log("error found while find by id", err);
      throw new BadRequestException("user not found");
    });
  }

  async findAll(): Promise<any> {
    return this.prisma.user.findMany().then((res) => {
      return res;
    }).catch((err) => {
      throw new BadRequestException(err);
    });
  }

  async updateUser(id: string, data: UpdateUserDto) {
    await this.findById(id)
    const where = { id };
    return this.prisma.user.update({ where, data })
      .then((res) => {
        console.log("Updated -->", res);
        return res;
      }).catch((err) => {
        console.log("error --->", err);
        throw new BadRequestException(err);
      });
  }

  async removeUser(id: string): Promise<any> {

    // check user exist or not
    await this.findById(id);

    const where = { id };
    return this.prisma.user.delete({ where }).then((res) => {
      console.log("removed successfully", res);
      return res;
    }).catch((err) => {
      console.log('error found while delete', err);
      if(err.code === 'P2025') throw new BadRequestException('User Not Found');
    });
  }
}

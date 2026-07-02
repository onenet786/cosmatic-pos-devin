import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.role.create({ data });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.role.findMany({ where: { tenantId } });
  }

  async findOne(id: string) {
    return this.prisma.role.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.role.update({ where: { id }, data });
  }
}

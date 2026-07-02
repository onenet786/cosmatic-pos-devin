import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BranchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.branch.create({ data });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.branch.findMany({ where: { tenantId, isActive: true } });
  }

  async findOne(id: string) {
    return this.prisma.branch.findUnique({ where: { id } });
  }

  async update(id: string, data: any) {
    return this.prisma.branch.update({ where: { id }, data });
  }
}

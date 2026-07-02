import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TenantService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; slug: string }) {
    return this.prisma.tenant.create({ data });
  }

  async findAll() {
    return this.prisma.tenant.findMany({ where: { isActive: true } });
  }

  async findOne(id: string) {
    return this.prisma.tenant.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<{ name: string; slug: string; config: any; isActive: boolean }>) {
    return this.prisma.tenant.update({ where: { id }, data });
  }
}

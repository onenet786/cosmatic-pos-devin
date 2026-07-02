import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WarehouseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.warehouse.create({ data });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.warehouse.findMany({ where: { tenantId, isActive: true }, include: { branch: true } });
  }

  async findOne(id: string) {
    return this.prisma.warehouse.findUnique({ where: { id }, include: { branch: true } });
  }

  async update(id: string, data: any) {
    return this.prisma.warehouse.update({ where: { id }, data });
  }
}

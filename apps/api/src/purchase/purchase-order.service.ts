import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PurchaseOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.purchaseOrder.create({
      data: { ...data, lines: { createMany: { data: data.lines } } },
      include: { lines: true, supplier: true },
    });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.purchaseOrder.findMany({
      where: { tenantId },
      include: { lines: { include: { item: true } }, supplier: true },
      orderBy: { orderDate: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.purchaseOrder.findUnique({
      where: { id },
      include: { lines: { include: { item: true } }, supplier: true, grns: true },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.purchaseOrder.update({ where: { id }, data });
  }
}

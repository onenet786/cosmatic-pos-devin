import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalesOrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.salesOrder.create({
      data: { ...data, lines: { createMany: { data: data.lines } } },
      include: { lines: true, customer: true },
    });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.salesOrder.findMany({
      where: { tenantId },
      include: { lines: { include: { item: true } }, customer: true },
      orderBy: { orderDate: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.salesOrder.findUnique({
      where: { id },
      include: { lines: { include: { item: true } }, customer: true, invoices: true },
    });
  }
}

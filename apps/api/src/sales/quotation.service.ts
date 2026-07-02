import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuotationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.quotation.create({
      data: { ...data, lines: { createMany: { data: data.lines } } },
      include: { lines: true, customer: true },
    });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.quotation.findMany({
      where: { tenantId },
      include: { lines: { include: { item: true } }, customer: true },
      orderBy: { quoteDate: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.quotation.findUnique({
      where: { id },
      include: { lines: { include: { item: true } }, customer: true, salesOrders: true },
    });
  }
}

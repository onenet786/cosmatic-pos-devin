import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalesReturnService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.salesReturn.create({
      data: { ...data, lines: { createMany: { data: data.lines } } },
      include: { lines: true, customer: true, invoice: true },
    });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.salesReturn.findMany({
      where: { tenantId },
      include: { lines: { include: { item: true } }, customer: true, invoice: true },
      orderBy: { returnDate: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.salesReturn.findUnique({
      where: { id },
      include: { lines: { include: { item: true } }, customer: true, invoice: true },
    });
  }
}

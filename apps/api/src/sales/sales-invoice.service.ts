import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SalesInvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.salesInvoice.create({
      data: { ...data, lines: { createMany: { data: data.lines } } },
      include: { lines: true, customer: true },
    });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.salesInvoice.findMany({
      where: { tenantId },
      include: { lines: { include: { item: true } }, customer: true, receipts: true },
      orderBy: { invoiceDate: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.salesInvoice.findUnique({
      where: { id },
      include: { lines: { include: { item: true } }, customer: true, receipts: true, returns: true },
    });
  }
}

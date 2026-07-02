import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PurchaseInvoiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.purchaseInvoice.create({
      data: { ...data, lines: { createMany: { data: data.lines } } },
      include: { lines: true, supplier: true, grn: true },
    });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.purchaseInvoice.findMany({
      where: { tenantId },
      include: { lines: { include: { item: true } }, supplier: true, grn: true },
      orderBy: { invoiceDate: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.purchaseInvoice.findUnique({
      where: { id },
      include: { lines: { include: { item: true } }, supplier: true, grn: true, payments: true },
    });
  }
}

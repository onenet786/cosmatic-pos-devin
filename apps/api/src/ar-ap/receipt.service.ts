import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReceiptService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const receipt = await this.prisma.receipt.create({ data, include: { customer: true, invoice: true } });
    if (data.invoiceId) {
      await this.prisma.salesInvoice.update({
        where: { id: data.invoiceId },
        data: { paidAmount: { increment: data.amount } },
      });
    }
    return receipt;
  }

  async findByTenant(tenantId: string) {
    return this.prisma.receipt.findMany({ where: { tenantId }, include: { customer: true, invoice: true }, orderBy: { receiptDate: 'desc' } });
  }
}

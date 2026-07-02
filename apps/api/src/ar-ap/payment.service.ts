import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    const payment = await this.prisma.payment.create({ data, include: { supplier: true, invoice: true } });
    if (data.invoiceId) {
      await this.prisma.purchaseInvoice.update({
        where: { id: data.invoiceId },
        data: { paidAmount: { increment: data.amount } },
      });
    }
    return payment;
  }

  async findByTenant(tenantId: string) {
    return this.prisma.payment.findMany({ where: { tenantId }, include: { supplier: true, invoice: true }, orderBy: { paymentDate: 'desc' } });
  }
}

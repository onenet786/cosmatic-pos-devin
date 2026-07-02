import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardSummary(tenantId: string, branchId?: string) {
    const where = branchId ? { tenantId, branchId } : { tenantId };
    const [salesToday, stockValue, pendingReturns] = await Promise.all([
      this.prisma.pOSTransaction.aggregate({ where: { ...where, transactionDate: { gte: new Date(new Date().setHours(0,0,0,0)) } }, _sum: { total: true } }),
      this.prisma.stockLedgerEntry.aggregate({ where: { tenantId }, _sum: { totalCost: true } }),
      this.prisma.returnRequest.count({ where: { tenantId, status: 'PENDING' } }),
    ]);
    return { salesToday: salesToday._sum.total || 0, stockValue: stockValue._sum.totalCost || 0, pendingReturns };
  }

  async getTrialBalance(tenantId: string, fiscalYearId: string) {
    const accounts = await this.prisma.chartOfAccount.findMany({ where: { tenantId, fiscalYearId }, include: { voucherLines: true } });
    return accounts.map((a: any) => ({
      id: a.id,
      code: a.code,
      name: a.name,
      debit: a.voucherLines.reduce((s: number, l: any) => s + Number(l.debit), 0),
      credit: a.voucherLines.reduce((s: number, l: any) => s + Number(l.credit), 0),
      balance: a.voucherLines.reduce((s: number, l: any) => s + Number(l.debit) - Number(l.credit), 0),
    }));
  }

  async getARAging(tenantId: string) {
    const invoices = await this.prisma.salesInvoice.findMany({ where: { tenantId, status: { in: ['POSTED', 'PARTIALLY_PAID'] } }, include: { customer: true } });
    const now = new Date();
    return invoices.map((inv: any) => {
      const days = Math.floor((now.getTime() - new Date(inv.invoiceDate).getTime()) / (1000 * 60 * 60 * 24));
      const bucket = days <= 30 ? '0-30' : days <= 60 ? '31-60' : days <= 90 ? '61-90' : '90+';
      return { ...inv, daysOverdue: days, bucket };
    });
  }
}

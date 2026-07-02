import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  async getStock(tenantId: string, filters: { warehouseId?: string; itemId?: string }) {
    const entries = await this.prisma.stockLedgerEntry.findMany({
      where: { tenantId, ...filters },
      orderBy: { date: 'desc' },
    });
    return entries;
  }

  async getStockValuation(tenantId: string) {
    const result = await this.prisma.stockLedgerEntry.groupBy({
      by: ['itemId'],
      where: { tenantId },
      _sum: { baseQuantity: true, totalCost: true },
    });
    return result;
  }

  async createTransfer(data: any) {
    return this.prisma.stockTransfer.create({ data: { ...data, lines: { createMany: { data: data.lines } } }, include: { lines: true } });
  }

  async createAdjustment(data: any) {
    return this.prisma.stockAdjustment.create({ data });
  }
}

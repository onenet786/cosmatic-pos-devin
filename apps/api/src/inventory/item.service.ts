import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.item.create({
      data,
      include: { baseUom: true, purchaseUom: true, salesUom: true, reportingUom: true, barcodes: true },
    });
  }

  async findByTenant(tenantId: string, query: any = {}) {
    return this.prisma.item.findMany({
      where: { tenantId, isActive: true, ...query },
      include: { baseUom: true, purchaseUom: true, salesUom: true, reportingUom: true, barcodes: true, variants: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.item.findUnique({
      where: { id },
      include: { baseUom: true, purchaseUom: true, salesUom: true, reportingUom: true, barcodes: true, variants: true, uomConversions: true },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.item.update({ where: { id }, data });
  }
}

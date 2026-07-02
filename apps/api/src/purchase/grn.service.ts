import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GRNService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.goodsReceivedNote.create({
      data: { ...data, lines: { createMany: { data: data.lines } } },
      include: { lines: true, supplier: true, po: true },
    });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.goodsReceivedNote.findMany({
      where: { tenantId },
      include: { lines: { include: { item: true } }, supplier: true },
      orderBy: { grnDate: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.goodsReceivedNote.findUnique({
      where: { id },
      include: { lines: { include: { item: true } }, supplier: true, po: true, invoice: true },
    });
  }
}

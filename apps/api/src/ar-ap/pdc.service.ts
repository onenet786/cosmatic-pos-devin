import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PDCService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.pDCCheque.create({ data, include: { party: true, bankAccount: true } });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.pDCCheque.findMany({ where: { tenantId }, include: { party: true, bankAccount: true }, orderBy: { maturityDate: 'asc' } });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.pDCCheque.update({ where: { id }, data: { status } });
  }
}

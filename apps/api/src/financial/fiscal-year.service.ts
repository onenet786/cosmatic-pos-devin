import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FiscalYearService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.fiscalYear.create({ data });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.fiscalYear.findMany({ where: { tenantId }, orderBy: { startDate: 'desc' } });
  }

  async findOne(id: string) {
    return this.prisma.fiscalYear.findUnique({ where: { id } });
  }

  async closeYear(id: string) {
    return this.prisma.fiscalYear.update({
      where: { id },
      data: { isClosed: true, isActive: false },
    });
  }
}

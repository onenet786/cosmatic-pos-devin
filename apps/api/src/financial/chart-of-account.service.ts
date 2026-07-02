import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChartOfAccountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.chartOfAccount.create({ data });
  }

  async findByTenant(tenantId: string) {
    return this.prisma.chartOfAccount.findMany({
      where: { tenantId },
      include: { parent: true, children: true },
      orderBy: { code: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.chartOfAccount.findUnique({
      where: { id },
      include: { parent: true, children: true },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.chartOfAccount.update({ where: { id }, data });
  }
}

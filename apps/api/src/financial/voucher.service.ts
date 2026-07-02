import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { publicUserSelect } from '../auth/public-user-select';

@Injectable()
export class VoucherService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any & { lines: any[] }) {
    const totalDebit = data.lines.reduce((sum: number, l: any) => sum + (Number(l.debit) || 0), 0);
    const totalCredit = data.lines.reduce((sum: number, l: any) => sum + (Number(l.credit) || 0), 0);
    if (totalDebit !== totalCredit) {
      throw new BadRequestException('Debit and Credit must be equal');
    }
    return this.prisma.voucher.create({
      data: {
        ...data,
        totalDebit,
        totalCredit,
        lines: { createMany: { data: data.lines } },
      },
      include: { lines: true },
    });
  }

  async findByTenant(tenantId: string, query: any) {
    return this.prisma.voucher.findMany({
      where: { tenantId, ...query },
      include: { lines: { include: { account: true } }, branch: true, createdBy: { select: publicUserSelect } },
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.voucher.findUnique({
      where: { id },
      include: { lines: { include: { account: true } }, branch: true, createdBy: { select: publicUserSelect } },
    });
  }

  async reverse(id: string, userId: string) {
    const original = await this.prisma.voucher.findUnique({ where: { id }, include: { lines: true } });
    if (!original || original.status === 'REVERSED') throw new BadRequestException('Invalid voucher');

    const reversedLines = original.lines.map((l: any) => ({
      accountId: l.accountId,
      debit: l.credit,
      credit: l.debit,
      narration: `Reversal of ${original.number}`,
    }));

    const reversed = await this.prisma.voucher.create({
      data: {
        tenantId: original.tenantId,
        branchId: original.branchId,
        fiscalYearId: original.fiscalYearId,
        createdById: userId,
        type: original.type,
        number: `${original.number}-R`,
        date: new Date(),
        narration: `Reversal of voucher ${original.number}`,
        totalDebit: original.totalCredit,
        totalCredit: original.totalDebit,
        status: 'POSTED',
        reversedFromId: original.id,
        lines: { createMany: { data: reversedLines } },
      },
    });

    await this.prisma.voucher.update({ where: { id }, data: { status: 'REVERSED' } });
    return reversed;
  }
}

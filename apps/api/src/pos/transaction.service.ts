import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.pOSTransaction.create({
      data: { ...data, lines: { createMany: { data: data.lines } }, payments: { createMany: { data: data.payments } } },
      include: { lines: { include: { item: true } }, payments: true, customer: true },
    });
  }

  async findBySession(sessionId: string) {
    return this.prisma.pOSTransaction.findMany({
      where: { sessionId },
      include: { lines: { include: { item: true } }, payments: true, customer: true },
      orderBy: { transactionDate: 'desc' },
    });
  }

  async sync(id: string) {
    return this.prisma.pOSTransaction.update({
      where: { id },
      data: { isSynced: true, syncedAt: new Date() },
    });
  }
}

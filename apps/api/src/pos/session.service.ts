import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { publicUserSelect } from '../auth/public-user-select';

@Injectable()
export class SessionService {
  constructor(private readonly prisma: PrismaService) {}

  async open(data: any) {
    return this.prisma.pOSSession.create({ data, include: { user: { select: publicUserSelect }, branch: true } });
  }

  async close(id: string, data: { closingFloat: number; actualCash: number; overShort: number }) {
    return this.prisma.pOSSession.update({
      where: { id },
      data: { ...data, status: 'CLOSED', closedAt: new Date() },
      include: { user: { select: publicUserSelect }, branch: true },
    });
  }

  async findByBranch(branchId: string) {
    return this.prisma.pOSSession.findMany({
      where: { branchId },
      include: { user: { select: publicUserSelect }, branch: true, transactions: true },
      orderBy: { openedAt: 'desc' },
    });
  }

  async findOpenByUser(userId: string) {
    return this.prisma.pOSSession.findFirst({
      where: { userId, status: 'OPEN' },
      include: { transactions: true },
    });
  }
}

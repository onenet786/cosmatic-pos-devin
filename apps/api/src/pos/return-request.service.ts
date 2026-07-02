import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReturnRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.returnRequest.create({ data, include: { posTransaction: true } });
  }

  async findPending(tenantId: string) {
    return this.prisma.returnRequest.findMany({
      where: { tenantId, status: 'PENDING' },
      include: { posTransaction: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approve(id: string, approverId: string) {
    return this.prisma.returnRequest.update({
      where: { id },
      data: { status: 'APPROVED', approvedById: approverId, approvedAt: new Date() },
    });
  }

  async reject(id: string, rejectionReason: string) {
    return this.prisma.returnRequest.update({
      where: { id },
      data: { status: 'REJECTED', rejectionReason },
    });
  }
}

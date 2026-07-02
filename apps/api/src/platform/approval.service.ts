import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApprovalService {
  constructor(private readonly prisma: PrismaService) {}

  async getPendingApprovals(tenantId: string) {
    const [vouchers, returns, transfers, adjustments, returnRequests] = await Promise.all([
      this.prisma.voucher.findMany({ where: { tenantId, status: 'PENDING_APPROVAL' } }),
      this.prisma.salesReturn.findMany({ where: { tenantId, status: 'PENDING_APPROVAL' } }),
      this.prisma.stockTransfer.findMany({ where: { tenantId, status: 'REQUESTED' } }),
      this.prisma.stockAdjustment.findMany({ where: { tenantId, status: 'PENDING' } }),
      this.prisma.returnRequest.findMany({ where: { tenantId, status: 'PENDING' } }),
    ]);
    return { vouchers, salesReturns: returns, stockTransfers: transfers, stockAdjustments: adjustments, returnRequests };
  }

  async approve(data: any) {
    return this.prisma.approvalRecord.create({ data });
  }
}

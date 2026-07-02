import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { publicUserSelect } from '../auth/public-user-select';

@Injectable()
export class AuditService {
  constructor(private readonly prisma: PrismaService) {}

  async log(data: any) {
    return this.prisma.auditLogEntry.create({ data });
  }

  async findByTenant(tenantId: string, query: { entityType?: string; entityId?: string; skip?: number; take?: number }) {
    return this.prisma.auditLogEntry.findMany({
      where: { tenantId, ...query },
      include: { user: { select: publicUserSelect } },
      orderBy: { createdAt: 'desc' },
      skip: query.skip || 0,
      take: query.take || 50,
    });
  }
}

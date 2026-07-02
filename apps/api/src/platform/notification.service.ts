import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.notificationLog.create({ data });
  }

  async findByUser(userId: string) {
    return this.prisma.notificationLog.findMany({
      where: { userId },
      orderBy: { sentAt: 'desc' },
    });
  }

  async markRead(id: string) {
    return this.prisma.notificationLog.update({
      where: { id },
      data: { isRead: true, readAt: new Date() },
    });
  }
}

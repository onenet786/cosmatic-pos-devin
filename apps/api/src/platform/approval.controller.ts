import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApprovalService } from './approval.service';

@ApiTags('Approvals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('approvals')
export class ApprovalController {
  constructor(private readonly service: ApprovalService) {}

  @Get('pending')
  getPending(@Query('tenantId') tenantId: string) {
    return this.service.getPendingApprovals(tenantId);
  }

  @Post()
  approve(@Body() data: any) {
    return this.service.approve(data);
  }
}

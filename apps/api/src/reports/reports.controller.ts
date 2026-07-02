import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('dashboard')
  dashboard(@Query('tenantId') tenantId: string, @Query('branchId') branchId?: string) {
    return this.service.getDashboardSummary(tenantId, branchId);
  }

  @Get('trial-balance')
  trialBalance(@Query('tenantId') tenantId: string, @Query('fiscalYearId') fiscalYearId: string) {
    return this.service.getTrialBalance(tenantId, fiscalYearId);
  }

  @Get('ar-aging')
  arAging(@Query('tenantId') tenantId: string) {
    return this.service.getARAging(tenantId);
  }
}

import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReturnRequestService } from './return-request.service';

@ApiTags('Return Requests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('return-requests')
export class ReturnRequestController {
  constructor(private readonly service: ReturnRequestService) {}

  @Post()
  create(@Body() data: any) { return this.service.create(data); }

  @Get('pending')
  findPending(@Query('tenantId') tenantId: string) { return this.service.findPending(tenantId); }

  @Post(':id/approve')
  approve(@Param('id') id: string, @Body('approverId') approverId: string) { return this.service.approve(id, approverId); }

  @Post(':id/reject')
  reject(@Param('id') id: string, @Body('reason') reason: string) { return this.service.reject(id, reason); }
}

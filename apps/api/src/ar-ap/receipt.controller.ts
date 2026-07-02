import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReceiptService } from './receipt.service';

@ApiTags('Receipts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('receipts')
export class ReceiptController {
  constructor(private readonly service: ReceiptService) {}

  @Post()
  create(@Body() data: any) { return this.service.create(data); }

  @Get()
  findAll(@Query('tenantId') tenantId: string) { return this.service.findByTenant(tenantId); }
}

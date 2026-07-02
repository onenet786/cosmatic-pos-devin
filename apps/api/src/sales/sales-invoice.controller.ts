import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SalesInvoiceService } from './sales-invoice.service';

@ApiTags('Sales Invoices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sales-invoices')
export class SalesInvoiceController {
  constructor(private readonly service: SalesInvoiceService) {}

  @Post()
  create(@Body() data: any) { return this.service.create(data); }

  @Get()
  findAll(@Query('tenantId') tenantId: string) { return this.service.findByTenant(tenantId); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }
}

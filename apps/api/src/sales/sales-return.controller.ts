import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SalesReturnService } from './sales-return.service';

@ApiTags('Sales Returns')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sales-returns')
export class SalesReturnController {
  constructor(private readonly service: SalesReturnService) {}

  @Post()
  create(@Body() data: any) { return this.service.create(data); }

  @Get()
  findAll(@Query('tenantId') tenantId: string) { return this.service.findByTenant(tenantId); }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }
}

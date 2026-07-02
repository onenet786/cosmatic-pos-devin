import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FiscalYearService } from './fiscal-year.service';

@ApiTags('Fiscal Years')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('fiscal-years')
export class FiscalYearController {
  constructor(private readonly service: FiscalYearService) {}

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Get()
  findAll(@Query('tenantId') tenantId: string) {
    return this.service.findByTenant(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/close')
  close(@Param('id') id: string) {
    return this.service.closeYear(id);
  }
}

import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChartOfAccountService } from './chart-of-account.service';

@ApiTags('Chart of Accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chart-of-accounts')
export class ChartOfAccountController {
  constructor(private readonly service: ChartOfAccountService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.service.update(id, data);
  }
}

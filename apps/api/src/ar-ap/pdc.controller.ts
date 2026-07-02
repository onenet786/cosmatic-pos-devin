import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PDCService } from './pdc.service';

@ApiTags('PDC Cheques')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pdc-cheques')
export class PDCController {
  constructor(private readonly service: PDCService) {}

  @Post()
  create(@Body() data: any) { return this.service.create(data); }

  @Get()
  findAll(@Query('tenantId') tenantId: string) { return this.service.findByTenant(tenantId); }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) { return this.service.updateStatus(id, status); }
}

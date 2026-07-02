import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StockService } from './stock.service';

@ApiTags('Stock')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('stock')
export class StockController {
  constructor(private readonly service: StockService) {}

  @Get()
  getStock(@Query() query: any) {
    return this.service.getStock(query.tenantId, query);
  }

  @Get('valuation')
  getValuation(@Query('tenantId') tenantId: string) {
    return this.service.getStockValuation(tenantId);
  }

  @Post('transfer')
  createTransfer(@Body() data: any) {
    return this.service.createTransfer(data);
  }

  @Post('adjustment')
  createAdjustment(@Body() data: any) {
    return this.service.createAdjustment(data);
  }
}

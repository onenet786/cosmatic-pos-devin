import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionService } from './transaction.service';

@ApiTags('POS Transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pos-transactions')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Post()
  create(@Body() data: any) { return this.service.create(data); }

  @Get()
  findBySession(@Query('sessionId') sessionId: string) { return this.service.findBySession(sessionId); }

  @Post(':id/sync')
  sync(@Param('id') id: string) { return this.service.sync(id); }
}

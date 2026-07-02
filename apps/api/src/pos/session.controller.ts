import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SessionService } from './session.service';

@ApiTags('POS Sessions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pos-sessions')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  @Post('open')
  open(@Body() data: any) { return this.service.open(data); }

  @Post(':id/close')
  close(@Param('id') id: string, @Body() data: any) { return this.service.close(id, data); }

  @Get()
  findByBranch(@Query('branchId') branchId: string) { return this.service.findByBranch(branchId); }

  @Get('user/open')
  findOpenByUser(@Query('userId') userId: string) { return this.service.findOpenByUser(userId); }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PlatformModule } from './platform/platform.module';
import { FinancialModule } from './financial/financial.module';
import { InventoryModule } from './inventory/inventory.module';
import { PurchaseModule } from './purchase/purchase.module';
import { SalesModule } from './sales/sales.module';
import { ArApModule } from './ar-ap/ar-ap.module';
import { PosModule } from './pos/pos.module';
import { ReportsModule } from './reports/reports.module';

const jwtSecret = process.env.JWT_SECRET;

if (process.env.NODE_ENV === 'production' && !jwtSecret) {
  throw new Error('JWT_SECRET must be set in production');
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: jwtSecret || 'development-only-secret-change-me',
      signOptions: { expiresIn: process.env.JWT_EXPIRATION || '24h' },
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    PlatformModule,
    FinancialModule,
    InventoryModule,
    PurchaseModule,
    SalesModule,
    ArApModule,
    PosModule,
    ReportsModule,
  ],
})
export class AppModule {}

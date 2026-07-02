import { Module } from '@nestjs/common';
import { ChartOfAccountController } from './chart-of-account.controller';
import { VoucherController } from './voucher.controller';
import { FiscalYearController } from './fiscal-year.controller';
import { ChartOfAccountService } from './chart-of-account.service';
import { VoucherService } from './voucher.service';
import { FiscalYearService } from './fiscal-year.service';

@Module({
  controllers: [ChartOfAccountController, VoucherController, FiscalYearController],
  providers: [ChartOfAccountService, VoucherService, FiscalYearService],
  exports: [ChartOfAccountService, VoucherService, FiscalYearService],
})
export class FinancialModule {}

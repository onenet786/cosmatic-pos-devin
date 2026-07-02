import { Module } from '@nestjs/common';
import { QuotationController } from './quotation.controller';
import { SalesOrderController } from './sales-order.controller';
import { SalesInvoiceController } from './sales-invoice.controller';
import { SalesReturnController } from './sales-return.controller';
import { QuotationService } from './quotation.service';
import { SalesOrderService } from './sales-order.service';
import { SalesInvoiceService } from './sales-invoice.service';
import { SalesReturnService } from './sales-return.service';

@Module({
  controllers: [QuotationController, SalesOrderController, SalesInvoiceController, SalesReturnController],
  providers: [QuotationService, SalesOrderService, SalesInvoiceService, SalesReturnService],
  exports: [QuotationService, SalesOrderService, SalesInvoiceService, SalesReturnService],
})
export class SalesModule {}

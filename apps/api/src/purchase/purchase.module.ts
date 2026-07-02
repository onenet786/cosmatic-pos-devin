import { Module } from '@nestjs/common';
import { PurchaseOrderController } from './purchase-order.controller';
import { GRNController } from './grn.controller';
import { PurchaseInvoiceController } from './purchase-invoice.controller';
import { PurchaseOrderService } from './purchase-order.service';
import { GRNService } from './grn.service';
import { PurchaseInvoiceService } from './purchase-invoice.service';

@Module({
  controllers: [PurchaseOrderController, GRNController, PurchaseInvoiceController],
  providers: [PurchaseOrderService, GRNService, PurchaseInvoiceService],
  exports: [PurchaseOrderService, GRNService, PurchaseInvoiceService],
})
export class PurchaseModule {}

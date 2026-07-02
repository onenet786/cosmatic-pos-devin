import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { ReceiptController } from './receipt.controller';
import { PDCController } from './pdc.controller';
import { PaymentService } from './payment.service';
import { ReceiptService } from './receipt.service';
import { PDCService } from './pdc.service';

@Module({
  controllers: [PaymentController, ReceiptController, PDCController],
  providers: [PaymentService, ReceiptService, PDCService],
  exports: [PaymentService, ReceiptService, PDCService],
})
export class ArApModule {}

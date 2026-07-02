import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { TransactionController } from './transaction.controller';
import { ReturnRequestController } from './return-request.controller';
import { SessionService } from './session.service';
import { TransactionService } from './transaction.service';
import { ReturnRequestService } from './return-request.service';

@Module({
  controllers: [SessionController, TransactionController, ReturnRequestController],
  providers: [SessionService, TransactionService, ReturnRequestService],
  exports: [SessionService, TransactionService, ReturnRequestService],
})
export class PosModule {}

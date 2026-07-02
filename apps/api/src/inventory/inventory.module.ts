import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { WarehouseController } from './warehouse.controller';
import { StockController } from './stock.controller';
import { ItemService } from './item.service';
import { WarehouseService } from './warehouse.service';
import { StockService } from './stock.service';

@Module({
  controllers: [ItemController, WarehouseController, StockController],
  providers: [ItemService, WarehouseService, StockService],
  exports: [ItemService, WarehouseService, StockService],
})
export class InventoryModule {}

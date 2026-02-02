import { Module } from '@nestjs/common';
import { ComboController } from './combo.controller';
import { ComboService } from './combo.service';
import { AdminComboController } from './admin-combo.controller';

@Module({
  imports: [],
  providers: [ComboService],
  exports: [ComboService],
  controllers: [ComboController, AdminComboController],
})
export class ComboModule {}

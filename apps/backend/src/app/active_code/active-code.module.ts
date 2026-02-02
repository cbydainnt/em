import { Module } from '@nestjs/common';
import { ActiveCodeService } from './active-code.service';
import { ActiveCodeController } from './active-code.controller';

@Module({
  imports: [],
  providers: [ActiveCodeService],
  exports: [ActiveCodeService],
  controllers: [ActiveCodeController],
})
export class ActiveCodeModule {}

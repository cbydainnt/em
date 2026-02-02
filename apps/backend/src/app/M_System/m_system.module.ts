import { Module } from '@nestjs/common';
import { M_SystemService } from './m_system.service';
import { M_SystemResolver } from './m_system.resolver';
import { M_SystemController } from './m_system.controller';

@Module({
  imports: [],
  providers: [M_SystemResolver, M_SystemService],
  exports: [M_SystemService],
  controllers: [M_SystemController],
})
export class M_SystemModule {}

import { Module } from "@nestjs/common";
import { RegistController } from "./regist.controller";
import {RegistService } from "./regist.service";
import { UserModule } from '@/app/user/user.module';
@Module({
  imports: [UserModule],
  providers: [RegistService],
    exports: [RegistService],
    controllers: [RegistController],
})
export class RegistModule {}
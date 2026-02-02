import { Module } from "@nestjs/common";
import { SectionController } from "./section.controller";
import { SectionService } from "./section.service";
@Module({
  imports: [],
  providers: [SectionService],
    exports: [SectionService],
    controllers: [SectionController],
})
export class SectionModule {}
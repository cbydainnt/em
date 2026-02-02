import { Controller, Get, Param } from '@nestjs/common';
import { SectionService } from './section.service';
@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}
  
  @Get(':sectionId')
  async getSectionById(@Param('sectionId') sectionId: string) {
    return await this.sectionService.getSectionById(sectionId);
  }
}

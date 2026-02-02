import { Controller, Get, Post, Delete, Body, Param, BadRequestException, Req, UseGuards, Patch } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}
  // CREATE
  @Post('create')
  async create(@Body() body: CreateNoteDto) {
    try {
      const user_id = body.user_id;

      return await this.noteService.createNote({
        ...body,
        user_id,
      });
    } catch (err: any) {
      console.error('❌ Error creating note:', err);
      throw new BadRequestException(err.message);
    }
  }

  // GET
  @Get('lesson/:lesson_id/:user_id')
  async getByLesson(@Param('lesson_id') lesson_id: string, @Param('user_id') user_id: string) {
    return await this.noteService.findByLesson(lesson_id, user_id);
  }

  // UPDATE
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateNoteDto) {
    return this.noteService.updateNote(id, body);
  }

  // DELETE
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.noteService.deleteNote(id);
  }
}

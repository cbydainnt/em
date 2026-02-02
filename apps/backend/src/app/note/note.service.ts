import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';

const prisma = new PrismaClient();

@Injectable()
export class NoteService {
  async createNote(data: CreateNoteDto & { user_id: string }) {
    const existing = await prisma.note.findFirst({
      where: {
        lesson_id: data.lesson_id,
        user_id: data.user_id,
        timestamp: data.timestamp,
        del_flg: false,
      },
    });
    if (existing) {
      return prisma.note.update({
        where: { note_id: existing.note_id },
        data: {
          content: existing.content + '\n' + data.content,
          background_color: data.background_color ?? existing.background_color,
        },
      });
    }
    return await prisma.note.create({ data });
  }

  async findByLesson(lesson_id: string, user_id: string) {
    return await prisma.note.findMany({
      where: { lesson_id, user_id, del_flg: false },
      orderBy: { timestamp: 'asc' },
    });
  }

  async updateNote(note_id: string, body: UpdateNoteDto) {
    const existing = await prisma.note.findUnique({ where: { note_id } });

    if (!existing) throw new NotFoundException('Note not found');

    return prisma.note.update({
      where: { note_id },
      data: {
        content: body.content,
        background_color: body.background_color ?? existing.background_color,
      },
    });
  }

  async deleteNote(note_id: string) {
    const existing = await prisma.note.findUnique({ where: { note_id, del_flg: false } });

    if (!existing) throw new NotFoundException('Note not found');

    return prisma.note.delete({
      where: { note_id: note_id },
    });
  }
}

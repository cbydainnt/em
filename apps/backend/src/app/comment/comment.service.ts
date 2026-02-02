import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class CommentService {
  async create(data: CreateCommentDto) {
    const { course_id, lesson_id, content, user_id, parent_id, image_url } = data;

    if (!content?.trim() && !image_url) {
      throw new BadRequestException('Nội dung hoặc ảnh không được để trống');
    }

    let parent = null;
    if (parent_id) {
      parent = await prisma.comment.findUnique({
        where: { comment_id: parent_id },
      });
      if (!parent) throw new NotFoundException('Parent comment not found');
    }

    const newComment = await prisma.comment.create({
      data: {
        content: content || '',
        user_id,
        course_id: course_id ?? parent?.course_id ?? null,
        lesson_id: lesson_id ?? parent?.lesson_id ?? null,
        parent_id: parent_id ?? null,
        image_url: image_url ?? null,
      },
      include: {
        user: { select: { name: true, avatar: true } },
      },
    });

    return newComment;
  }

  async findByCourse(course_id: string) {
    if (!course_id || course_id === 'undefined') {
      throw new BadRequestException('Invalid course_id');
    }

    return await prisma.comment.findMany({
      where: {
        course_id,
        del_flg: false,
        parent_id: null,
      },
      include: {
        user: { select: { name: true, avatar: true } },
        replies: {
          where: { del_flg: false },
          orderBy: { created_at: 'asc' },
          include: {
            user: { select: { name: true, avatar: true } },
          },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    return prisma.comment.findUnique({
      where: { comment_id: id },
      include: {
        user: { select: { name: true, avatar: true } },
      },
    });
  }

  async findByLesson(lesson_id: string) {
    if (!lesson_id || lesson_id === 'undefined') {
      throw new BadRequestException('Invalid lesson_id');
    }

    return await prisma.comment.findMany({
      where: { lesson_id, del_flg: false, parent_id: null },
      include: {
        user: { select: { name: true, avatar: true } },
        replies: {
          where: { del_flg: false },
          orderBy: { created_at: 'asc' },
          include: { user: { select: { name: true, avatar: true } } },
        },
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async update(comment_id: string, user_id: string, dto: UpdateCommentDto) {
    const existing = await prisma.comment.findFirst({
      where: { comment_id, del_flg: false },
    });

    if (!existing) throw new NotFoundException('Comment not found');
    if (existing.user_id !== user_id) {
      throw new ForbiddenException('You cannot edit this comment');
    }

    if (!dto.content?.trim() && !dto.image_url && !existing.image_url) {
      throw new BadRequestException('Comment must have content or image');
    }

    return prisma.comment.update({
      where: { comment_id },
      data: {
        content: dto.content || existing.content,
        image_url: dto.image_url ?? existing.image_url,
        updated_by: user_id,
      },
      include: {
        user: { select: { name: true, avatar: true } },
      },
    });
  }

  async delete(comment_id: string, user_id: string) {
    const existing = await prisma.comment.findFirst({
      where: { comment_id, del_flg: false },
    });

    if (!existing) throw new NotFoundException('Comment not found');
    if (existing.user_id !== user_id) {
      throw new ForbiddenException('You cannot delete this comment');
    }

    await prisma.comment.deleteMany({
      where: { parent_id: comment_id },
    });

    return prisma.comment.delete({
      where: { comment_id },
    });
  }
}

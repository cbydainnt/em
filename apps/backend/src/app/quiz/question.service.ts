import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface QuestionFilterDto {
  page?: number;
  pageSize?: number;
  search?: string;
  quiz_id?: string;
  question_type?: number;
  difficulty?: number;
  quiz_type?: number;
  has_audio?: string;
  has_reading?: string;
  has_answers?: string;
  min_points?: number;
  max_points?: number;
  sort?: string;
}

export interface CreateQuestionDto {
  quiz_id?: string;
  question_text: string;
  question_type: number;
  points: number;
  difficulty: number;
  explanation?: string;
  order: number;
  audio_id?: string | null;
  reading_passage_id?: string | null;
  answers: CreateAnswerDto[];
}

export interface CreateAnswerDto {
  answer_text: string;
  is_correct: boolean;
  order: number;
  match_key?: string;
  blank_position?: number;
}

export interface UpdateQuestionDto extends Partial<CreateQuestionDto> {}

export interface QuestionStats {
  total: number;
  withAudio: number;
  withReading: number;
  withAnswers: number;
  withoutAnswers: number;
  averageDifficulty: number;
  totalPoints: number;
  byType: Record<number, number>;
  byDifficulty: Record<number, number>;
}

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: QuestionFilterDto) {
    const { page = 1, pageSize = 20, search, quiz_id, question_type, difficulty, quiz_type, has_audio, has_reading, has_answers, min_points, max_points, sort = 'created_at_desc' } = filters;

    const skip = (page - 1) * pageSize;
    const where: any = { del_flg: false };

    // Text search
    if (search) {
      where.question_text = { contains: search, mode: 'insensitive' };
    }

    // Quiz filter
    if (quiz_id) {
      where.quiz_id = quiz_id;
    }

    // Question type filter
    if (question_type) {
      where.question_type = Number(question_type);
    }

    // Difficulty filter
    if (difficulty) {
      where.difficulty = Number(difficulty);
    }

    // Points range filter
    if (min_points !== undefined) {
      where.points = { ...where.points, gte: Number(min_points) };
    }
    if (max_points !== undefined) {
      where.points = { ...where.points, lte: Number(max_points) };
    }

    // Audio filter
    if (has_audio === 'yes') {
      where.audio_id = { not: null };
    } else if (has_audio === 'no') {
      where.audio_id = null;
    }

    // Reading passage filter
    if (has_reading === 'yes') {
      where.reading_passage_id = { not: null };
    } else if (has_reading === 'no') {
      where.reading_passage_id = null;
    }

    // Quiz type filter (requires join)
    if (quiz_type) {
      where.quiz = {
        quiz_type: Number(quiz_type),
      };
    }

    // Sorting
    const orderBy: any = {};
    switch (sort) {
      case 'created_at_asc':
        orderBy.created_at = 'asc';
        break;
      case 'created_at_desc':
        orderBy.created_at = 'desc';
        break;
      case 'difficulty_asc':
        orderBy.difficulty = 'asc';
        break;
      case 'difficulty_desc':
        orderBy.difficulty = 'desc';
        break;
      case 'points_asc':
        orderBy.points = 'asc';
        break;
      case 'points_desc':
        orderBy.points = 'desc';
        break;
      case 'question_text_asc':
        orderBy.question_text = 'asc';
        break;
      case 'question_text_desc':
        orderBy.question_text = 'desc';
        break;
      default:
        orderBy.created_at = 'desc';
    }

    const [data, total] = await Promise.all([
      this.prisma.question.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          quiz: {
            select: {
              quiz_id: true,
              title: true,
              quiz_type: true,
              status: true,
            },
          },
          answers: {
            orderBy: { order: 'asc' },
          },
          audio: {
            select: {
              audio_id: true,
              title: true,
              duration_seconds: true,
            },
          },
          reading_passage: {
            select: {
              reading_passage_id: true,
              title: true,
              content: true,
              difficulty: true,
            },
          },
        },
        orderBy,
      }),
      this.prisma.question.count({ where }),
    ]);

    // Filter by answers if needed (post-query filter)
    let filteredData = data;
    if (has_answers === 'yes') {
      filteredData = data.filter((q) => q.answers && q.answers.length > 0);
    } else if (has_answers === 'no') {
      filteredData = data.filter((q) => !q.answers || q.answers.length === 0);
    }

    const finalTotal = has_answers ? filteredData.length : total;

    return {
      data: filteredData,
      total: finalTotal,
      page,
      pageSize,
      totalPages: Math.ceil(finalTotal / pageSize),
    };
  }

  async getStatistics(filters: Partial<QuestionFilterDto>): Promise<QuestionStats> {
    const where: any = { del_flg: false };

    // Apply same filters as findAll
    if (filters.quiz_id) where.quiz_id = filters.quiz_id;
    if (filters.question_type) where.question_type = Number(filters.question_type);
    if (filters.difficulty) where.difficulty = Number(filters.difficulty);
    if (filters.has_audio === 'yes') where.audio_id = { not: null };
    if (filters.has_audio === 'no') where.audio_id = null;
    if (filters.has_reading === 'yes') where.reading_passage_id = { not: null };
    if (filters.has_reading === 'no') where.reading_passage_id = null;

    const questions = await this.prisma.question.findMany({
      where,
      include: {
        answers: true,
      },
    });

    const stats: QuestionStats = {
      total: questions.length,
      withAudio: questions.filter((q) => q.audio_id).length,
      withReading: questions.filter((q) => q.reading_passage_id).length,
      withAnswers: questions.filter((q) => q.answers && q.answers.length > 0).length,
      withoutAnswers: questions.filter((q) => !q.answers || q.answers.length === 0).length,
      averageDifficulty: questions.length > 0 ? questions.reduce((sum, q) => sum + q.difficulty, 0) / questions.length : 0,
      totalPoints: questions.reduce((sum, q) => sum + q.points, 0),
      byType: {},
      byDifficulty: {},
    };

    // Count by type
    questions.forEach((q) => {
      stats.byType[q.question_type] = (stats.byType[q.question_type] || 0) + 1;
    });

    // Count by difficulty
    questions.forEach((q) => {
      stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
    });

    return stats;
  }

  async findById(question_id: string) {
    const question = await this.prisma.question.findUnique({
      where: { question_id },
      include: {
        quiz: true,
        answers: {
          orderBy: { order: 'asc' },
        },
        audio: true,
        reading_passage: true,
      },
    });

    if (!question) {
      throw new NotFoundException('Câu hỏi không tồn tại');
    }

    return question;
  }

  async create(data: CreateQuestionDto) {
    const { answers, quiz_id, audio_id, reading_passage_id, ...questionData } = data;

    const createData: any = {
      ...questionData,
      answers: {
        create: answers.map((a, idx) => ({
          answer_text: a.answer_text,
          is_correct: a.is_correct,
          order: idx,
          match_key: a.match_key,
          blank_position: a.blank_position,
        })),
      },
    };

    // Chỉ connect quiz nếu có quiz_id và không rỗng
    if (quiz_id && quiz_id.trim() !== '') {
      createData.quiz = { connect: { quiz_id } };
    }

    // Xử lý audio_id: chỉ set nếu có giá trị và không rỗng
    if (audio_id && audio_id.trim() !== '') {
      createData.audio = { connect: { audio_id } };
    } else {
      createData.audio_id = null; // Explicitly set to null
    }

    // Xử lý reading_passage_id: chỉ set nếu có giá trị và không rỗng
    if (reading_passage_id && reading_passage_id.trim() !== '') {
      createData.reading_passage = { connect: { reading_passage_id } };
    } else {
      createData.reading_passage_id = null; // Explicitly set to null
    }

    return await this.prisma.question.create({
      data: createData,
      include: {
        answers: {
          orderBy: { order: 'asc' },
        },
        quiz: true,
        audio: true,
        reading_passage: true,
      },
    });
  }

  async update(question_id: string, data: UpdateQuestionDto) {
    const existingQuestion = await this.prisma.question.findUnique({
      where: { question_id },
    });

    if (!existingQuestion) {
      throw new NotFoundException('Câu hỏi không tồn tại');
    }

    const { answers, audio_id, reading_passage_id, ...questionData } = data;

    const updateData: any = {
      ...questionData,
      updated_at: new Date(),
    };

    if (audio_id !== undefined) {
      if (audio_id && audio_id.trim() !== '') {
        updateData.audio_id = audio_id;
      } else {
        updateData.audio_id = null;
      }
    }

    if (reading_passage_id !== undefined) {
      if (reading_passage_id && reading_passage_id.trim() !== '') {
        updateData.reading_passage_id = reading_passage_id;
      } else {
        updateData.reading_passage_id = null;
      }
    }

    if (answers) {
      await this.prisma.answer.deleteMany({
        where: { question_id },
      });

      return await this.prisma.question.update({
        where: { question_id },
        data: {
          ...updateData,
          answers: {
            create: answers.map((a, idx) => ({
              answer_text: a.answer_text,
              is_correct: a.is_correct,
              order: idx,
              match_key: a.match_key,
              blank_position: a.blank_position,
            })),
          },
        },
        include: {
          answers: {
            orderBy: { order: 'asc' },
          },
          quiz: true,
          audio: true,
          reading_passage: true,
        },
      });
    }

    // Update only question data
    return await this.prisma.question.update({
      where: { question_id },
      data: updateData,
      include: {
        answers: {
          orderBy: { order: 'asc' },
        },
        quiz: true,
        audio: true,
        reading_passage: true,
      },
    });
  }
  async delete(question_id: string) {
    const question = await this.prisma.question.findUnique({
      where: { question_id },
    });

    if (!question) {
      throw new NotFoundException('Câu hỏi không tồn tại');
    }

    // Soft delete
    return await this.prisma.question.update({
      where: { question_id },
      data: {
        del_flg: true,
        updated_at: new Date(),
      },
    });
  }

  async bulkDelete(ids: string[]) {
    // Soft delete multiple questions
    return await this.prisma.question.updateMany({
      where: {
        question_id: { in: ids },
      },
      data: {
        del_flg: true,
        updated_at: new Date(),
      },
    });
  }

  async duplicate(question_id: string) {
    const original = await this.findById(question_id);

    const { question_id: _, answers, quiz, audio, reading_passage, created_at, updated_at, ...questionData } = original as any;

    return await this.prisma.question.create({
      data: {
        ...questionData,
        question_text: `${questionData.question_text} (Copy)`,
        order: questionData.order + 1,
        answers: {
          create: answers.map((a: any, idx: number) => ({
            answer_text: a.answer_text,
            is_correct: a.is_correct,
            order: idx,
            match_key: a.match_key,
            blank_position: a.blank_position,
          })),
        },
      },
      include: {
        answers: {
          orderBy: { order: 'asc' },
        },
        quiz: true,
        audio: true,
        reading_passage: true,
      },
    });
  }

  async bulkDuplicate(ids: string[]) {
    const results = [];

    for (const id of ids) {
      try {
        const duplicated = await this.duplicate(id);
        results.push(duplicated);
      } catch (error) {
        console.error(`Failed to duplicate question ${id}:`, error);
      }
    }

    return results;
  }

  async exportQuestions(filters: Partial<QuestionFilterDto> & { ids?: string[] }) {
    let questions;

    if (filters.ids && filters.ids.length > 0) {
      // Export selected questions
      questions = await this.prisma.question.findMany({
        where: {
          question_id: { in: filters.ids },
          del_flg: false,
        },
        include: {
          quiz: true,
          answers: {
            orderBy: { order: 'asc' },
          },
          audio: true,
          reading_passage: true,
        },
      });
    } else {
      // Export with filters
      const result = await this.findAll({ ...filters, pageSize: 10000 });
      questions = result.data;
    }

    // Format as CSV
    const headers = ['Question ID', 'Quiz Title', 'Question Text', 'Question Type', 'Difficulty', 'Points', 'Order', 'Has Audio', 'Has Reading', 'Answers Count', 'Correct Answers', 'Explanation', 'Created At'];

    const rows = questions.map((q: any) => [q.question_id, q.quiz?.title || 'N/A', `"${q.question_text.replace(/"/g, '""')}"`, q.question_type, q.difficulty, q.points, q.order, q.audio_id ? 'Yes' : 'No', q.reading_passage_id ? 'Yes' : 'No', q.answers?.length || 0, q.answers?.filter((a: any) => a.is_correct).length || 0, q.explanation ? `"${q.explanation.replace(/"/g, '""')}"` : '', new Date(q.created_at).toISOString()]);

    const csv = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    return csv;
  }

  async updateAnswers(question_id: string, answers: CreateAnswerDto[]) {
    const question = await this.prisma.question.findUnique({
      where: { question_id },
    });

    if (!question) {
      throw new NotFoundException('Câu hỏi không tồn tại');
    }

    // Delete old answers
    await this.prisma.answer.deleteMany({
      where: { question_id },
    });

    // Create new answers
    await this.prisma.answer.createMany({
      data: answers.map((a, idx) => ({
        question_id,
        answer_text: a.answer_text,
        is_correct: a.is_correct,
        order: idx,
        match_key: a.match_key,
        blank_position: a.blank_position,
      })),
    });

    return await this.findById(question_id);
  }
}

import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { QuestionService, QuestionFilterDto, CreateQuestionDto, UpdateQuestionDto, CreateAnswerDto } from './question.service';
import { QuizService } from './quiz.service';

@Controller('admin/questions')
export class AdminQuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly quizService: QuizService,
  ) {}

  @Get('lesson-quizzes')
  async getLessonQuizzes(@Query('search') search?: string) {
    return this.quizService.getLessonQuizzes(search);
  }

  @Get('stats')
  async getQuestionStats(@Query('quiz_id') quiz_id?: string, @Query('question_type') question_type?: string, @Query('difficulty') difficulty?: string, @Query('has_audio') has_audio?: string, @Query('has_reading') has_reading?: string) {
    const filters: Partial<QuestionFilterDto> = {
      quiz_id: quiz_id || undefined,
      question_type: question_type ? parseInt(question_type) : undefined,
      difficulty: difficulty ? parseInt(difficulty) : undefined,
      has_audio: has_audio || undefined,
      has_reading: has_reading || undefined,
    };

    return this.questionService.getStatistics(filters);
  }

  @Get('export')
  async exportQuestions(@Query('quiz_id') quiz_id?: string, @Query('question_type') question_type?: string, @Query('difficulty') difficulty?: string, @Query('quiz_type') quiz_type?: string, @Query('has_audio') has_audio?: string, @Query('has_reading') has_reading?: string, @Query('has_answers') has_answers?: string, @Query('min_points') min_points?: string, @Query('max_points') max_points?: string, @Query('ids') ids?: string, @Res() res?: Response) {
    const filters: Partial<QuestionFilterDto> & { ids?: string[] } = {
      quiz_id: quiz_id || undefined,
      question_type: question_type ? parseInt(question_type) : undefined,
      difficulty: difficulty ? parseInt(difficulty) : undefined,
      quiz_type: quiz_type ? parseInt(quiz_type) : undefined,
      has_audio: has_audio || undefined,
      has_reading: has_reading || undefined,
      has_answers: has_answers || undefined,
      min_points: min_points ? parseInt(min_points) : undefined,
      max_points: max_points ? parseInt(max_points) : undefined,
      ids: ids ? ids.split(',') : undefined,
    };

    const csv = await this.questionService.exportQuestions(filters);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="questions_export_${new Date().toISOString().split('T')[0]}.csv"`);
    res.send(csv);
  }

  @Get()
  async getAllQuestions(@Query('page') page?: string, @Query('pageSize') pageSize?: string, @Query('search') search?: string, @Query('quiz_id') quiz_id?: string, @Query('question_type') question_type?: string, @Query('difficulty') difficulty?: string, @Query('quiz_type') quiz_type?: string, @Query('has_audio') has_audio?: string, @Query('has_reading') has_reading?: string, @Query('has_answers') has_answers?: string, @Query('min_points') min_points?: string, @Query('max_points') max_points?: string, @Query('sort') sort?: string) {
    const filters: QuestionFilterDto = {
      page: page ? parseInt(page) : 1,
      pageSize: pageSize ? parseInt(pageSize) : 20,
      search: search || undefined,
      quiz_id: quiz_id || undefined,
      question_type: question_type ? parseInt(question_type) : undefined,
      difficulty: difficulty ? parseInt(difficulty) : undefined,
      quiz_type: quiz_type ? parseInt(quiz_type) : undefined,
      has_audio: has_audio || undefined,
      has_reading: has_reading || undefined,
      has_answers: has_answers || undefined,
      min_points: min_points ? parseInt(min_points) : undefined,
      max_points: max_points ? parseInt(max_points) : undefined,
      sort: sort || 'created_at_desc',
    };

    return this.questionService.findAll(filters);
  }

  @Get(':id')
  async getQuestionById(@Param('id') id: string) {
    return this.questionService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuestion(@Body() data: CreateQuestionDto) {
    return this.questionService.create(data);
  }

  @Post(':id/duplicate')
  @HttpCode(HttpStatus.CREATED)
  async duplicateQuestion(@Param('id') id: string) {
    return this.questionService.duplicate(id);
  }

  @Post('bulk-duplicate')
  @HttpCode(HttpStatus.CREATED)
  async bulkDuplicateQuestions(@Body() data: { ids: string[] }) {
    return this.questionService.bulkDuplicate(data.ids);
  }

  @Put(':question_id')
  async updateQuestion(@Param('question_id') question_id: string, @Body() data: UpdateQuestionDto) {
    return this.questionService.update(question_id, data);
  }

  @Put(':id/answers')
  async updateQuestionAnswers(@Param('id') id: string, @Body() data: { answers: CreateAnswerDto[] }) {
    return this.questionService.updateAnswers(id, data.answers);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteQuestion(@Param('id') id: string) {
    await this.questionService.delete(id);
    return { message: 'Xóa câu hỏi thành công' };
  }

  @Post('bulk-delete')
  @HttpCode(HttpStatus.OK)
  async bulkDeleteQuestions(@Body() data: { ids: string[] }) {
    await this.questionService.bulkDelete(data.ids);
    return { message: `Xóa ${data.ids.length} câu hỏi thành công` };
  }
}

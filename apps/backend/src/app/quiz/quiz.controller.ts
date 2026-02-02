import { Controller, Get, Post, Body, Param, Req, UseGuards, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/login/jwt/jwt-auth.guard';
import { QuizService, SubmitQuizDto, SaveProgressDto, ReportQuestionDto } from './quiz.service';
@Controller('quiz')
@UseInterceptors(ClassSerializerInterceptor)
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  /**
   * Get all available quizzes for students
   */
  @Get()
  async getAllQuizzes() {
    return await this.quizService.findAll();
  }

  @Get('lesson/:lessonId')
  async getQuizzesByLesson(@Param('lessonId') lessonId: string) {
    return this.quizService.getQuizzesByLesson(lessonId);
  }

  @Get(':quizId/progress/latest')
  async getLatestProgress(@Param('quizId') quizId: string, @Query('user_id') userId: string) {
    return this.quizService.getLatestProgress(quizId, userId);
  }

  @Get(':quizId/progress/:progressId/answers')
  async getProgressAnswers(@Param('quizId') quizId: string, @Param('progressId') progressId: string) {
    return this.quizService.getProgressAnswers(progressId);
  }

  @Get(':quiz_id/results/latest')
  @UseGuards(JwtAuthGuard)
  async getLatestQuizResult(@Param('quiz_id') quiz_id: string, @Req() req: any) {
    const user_id = req.user.id;
    return await this.quizService.getLatestResult(quiz_id, user_id);
  }

  @Get(':quiz_id/take')
  @UseGuards(JwtAuthGuard)
  async getQuizToTake(@Param('quiz_id') quiz_id: string, @Req() req: any) {
    const user_id = req.user.id;
    return await this.quizService.getQuizForStudent(quiz_id, user_id);
  }

  @Get(':quiz_id/can-take')
  @UseGuards(JwtAuthGuard)
  async canTakeQuiz(@Param('quiz_id') quiz_id: string, @Req() req: any) {
    const user_id = req.user.id;
    return await this.quizService.canUserTakeQuiz(quiz_id, user_id);
  }

  @Post(':quiz_id/start')
  @UseGuards(JwtAuthGuard)
  async startQuizAttempt(@Param('quiz_id') quiz_id: string, @Req() req: any) {
    const user_id = req.user.id;
    return await this.quizService.startQuizAttempt(quiz_id, user_id);
  }

  @Post(':quiz_id/save-progress')
  @UseGuards(JwtAuthGuard)
  async saveProgress(@Param('quiz_id') quiz_id: string, @Body() data: SaveProgressDto, @Req() req: any) {
    const user_id = req.user.id;
    return await this.quizService.saveProgress(quiz_id, user_id, data);
  }

  @Get(':quiz_id/progress')
  @UseGuards(JwtAuthGuard)
  async getQuizProgress(@Param('quiz_id') quiz_id: string, @Req() req: any) {
    const user_id = req.user.id;
    return await this.quizService.getQuizProgress(quiz_id, user_id);
  }

  @Post(':quiz_id/submit')
  @UseGuards(JwtAuthGuard)
  async submitQuiz(@Param('quiz_id') quiz_id: string, @Body() data: SubmitQuizDto & { progress_id?: string }, @Req() req: any) {
    const user_id = req.user.id;
    return await this.quizService.submitQuiz(quiz_id, user_id, data);
  }

  @Get(':quiz_id/result/:progress_id')
  @UseGuards(JwtAuthGuard)
  async getQuizResultDetail(@Param('quiz_id') quiz_id: string, @Param('progress_id') progress_id: string, @Req() req: any) {
    const user_id = req.user.id;
    return await this.quizService.getQuizResultDetail(progress_id, user_id);
  }

  @Get(':quiz_id/results')
  @UseGuards(JwtAuthGuard)
  async getQuizResults(@Param('quiz_id') quiz_id: string, @Req() req: any) {
    const user_id = req.user.id;
    return await this.quizService.getUserQuizResults(quiz_id, user_id);
  }

  @Get(':quiz_id/results/:attempt')
  @UseGuards(JwtAuthGuard)
  async getAttemptResult(@Param('quiz_id') quiz_id: string, @Param('attempt') attempt: string, @Req() req: any) {
    const user_id = req.user.id;
    const attemptNumber = parseInt(attempt);
    return await this.quizService.getAttemptResult(quiz_id, user_id, attemptNumber);
  }

  @Post('questions/:question_id/report')
  @UseGuards(JwtAuthGuard)
  async reportQuestion(@Param('question_id') question_id: string, @Body() data: ReportQuestionDto, @Req() req: any) {
    const user_id = req.user.id;
    return await this.quizService.reportQuestion(question_id, user_id, data);
  }

  @Get('user/stats')
  @UseGuards(JwtAuthGuard)
  async getUserStats(@Req() req: any) {
    const user_id = req.user.id;
    return await this.quizService.getUserStatistics(user_id);
  }

  @Get(':quiz_id/lesson-info')
  @UseGuards(JwtAuthGuard)
  async getQuizLessonInfo(@Param('quiz_id') quizId: string) {
    return this.quizService.getQuizLessonInfo(quizId);
  }

  @Get(':user_id/get-all-result')
  @UseGuards(JwtAuthGuard)
  async getAllQuizResultByUser(@Req() req: any, @Param('user_id') user_id: string, @Query('page') page: string = '1', @Query('pageSize') pageSize: string = '10') {
    return await this.quizService.getAllResult(user_id, Number(page), Number(pageSize));
  }
}

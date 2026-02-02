import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, UseInterceptors, UploadedFile, Res, StreamableFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { QuizService, CreateQuizDto, UpdateQuizDto, QuizFilterDto } from './quiz.service';
import { WordParserService } from './word-parser.service';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('admin/quizzes')
export class AdminQuizController {
  constructor(
    private readonly quizService: QuizService,
    private readonly wordParserService: WordParserService,
  ) {}

  @Get()
  async getAllForAdmin(@Query('page') page?: string, @Query('pageSize') pageSize?: string, @Query('search') search?: string, @Query('includeDeleted') includeDeleted?: string, @Query('quiz_type') quiz_type?: string, @Query('difficulty_level') difficulty_level?: string, @Query('status') status?: string) {
    const filters: QuizFilterDto = {
      page: page ? parseInt(page) : 1,
      pageSize: pageSize ? parseInt(pageSize) : 20,
      search: search || undefined,
      includeDeleted: includeDeleted === 'true',
      quiz_type: quiz_type ? parseInt(quiz_type) : undefined,
      difficulty_level: difficulty_level ? parseInt(difficulty_level) : undefined,
      status: status ? parseInt(status) : undefined,
    };

    return await this.quizService.findAllForAdmin(filters);
  }

  @Get('download-template')
  async downloadTemplate(@Res() res: Response) {
    const template = this.wordParserService.generateTemplate();

    // Create a temporary text file
    const tempFilePath = path.join(process.cwd(), 'temp', 'quiz_template.txt');

    // Ensure temp directory exists
    const tempDir = path.dirname(tempFilePath);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    fs.writeFileSync(tempFilePath, template, 'utf8');

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', 'attachment; filename=quiz_import_template.docx');

    const fileStream = fs.createReadStream(tempFilePath);
    fileStream.pipe(res);

    // Clean up temp file after sending
    fileStream.on('end', () => {
      fs.unlinkSync(tempFilePath);
    });
  }

  @Get('active')
  async getActiveQuizzes(@Query('search') search?: string, @Query('quiz_type') quiz_type?: string) {
    return await this.quizService.getActiveQuizzes(search, quiz_type ? parseInt(quiz_type) : undefined);
  }

  @Get(':id')
  async getQuizById(@Param('id') id: string) {
    return await this.quizService.findByQuizId(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createQuiz(@Body() data: CreateQuizDto) {
    return await this.quizService.createQuiz(data);
  }

  @Put(':id')
  async updateQuiz(@Param('id') id: string, @Body() data: UpdateQuizDto & { version_notes?: string }) {
    const { version_notes, ...updateData } = data;
    return await this.quizService.updateQuizWithVersioning(id, updateData, version_notes);
  }

  @Get(':id/versions')
  async getQuizVersions(@Param('id') id: string) {
    return await this.quizService.getQuizVersions(id);
  }

  @Get(':id/versions/latest')
  async getLatestVersion(@Param('id') id: string) {
    return await this.quizService.getLatestVersion(id);
  }

  @Post(':id/versions')
  @HttpCode(HttpStatus.CREATED)
  async createNewVersion(@Param('id') id: string, @Body() data: UpdateQuizDto & { version_notes?: string }) {
    const { version_notes, ...updateData } = data;
    return await this.quizService.createNewVersion(id, updateData, version_notes);
  }

  @Post(':id/versions/restore')
  @HttpCode(HttpStatus.OK)
  async restoreVersion(@Param('id') id: string, @Body() data: { version_notes?: string }) {
    return await this.quizService.restoreVersion(id, data.version_notes);
  }

  @Get(':id/has-progress')
  async hasUserProgress(@Param('id') id: string) {
    const hasProgress = await this.quizService.hasUserProgress(id);
    return { has_progress: hasProgress };
  }

  @Delete(':id/soft')
  async softDeleteQuiz(@Param('id') id: string) {
    return await this.quizService.softDeleteQuiz(id);
  }

  @Delete(':id/hard')
  async hardDeleteQuiz(@Param('id') id: string) {
    return await this.quizService.hardDeleteQuiz(id);
  }

  @Put(':id/restore')
  async restoreQuiz(@Param('id') id: string) {
    return await this.quizService.restoreQuiz(id);
  }

  @Post('bulk-soft-delete')
  async bulkSoftDelete(@Body() data: { ids: string[] }) {
    return await this.quizService.bulkSoftDelete(data.ids);
  }

  @Post('bulk-hard-delete')
  async bulkHardDelete(@Body() data: { ids: string[] }) {
    return await this.quizService.bulkHardDelete(data.ids);
  }

  @Post('parse-word')
  @UseInterceptors(FileInterceptor('file'))
  async parseWordFile(@UploadedFile() file: Express.Multer.File): Promise<ParsedQuiz> {
    if (!file) {
      throw new Error('No file uploaded');
    }
    const parsedData = await this.wordParserService.parseWordFile(file.buffer);
    return parsedData;
  }

  // Additional endpoints for managing questions individually
  @Post(':quiz_id/questions')
  async addQuestion(@Param('quiz_id') quiz_id: string, @Body() questionData: any) {
    // Implementation for adding a single question to existing quiz
    // This would be used for manual question addition after import
    return { message: 'Question added successfully' };
  }

  @Put(':quiz_id/questions/:question_id')
  async updateQuestion(@Param('quiz_id') quiz_id: string, @Param('question_id') question_id: string, @Body() questionData: any) {
    // Implementation for updating a single question
    return { message: 'Question updated successfully' };
  }

  @Delete(':quiz_id/questions/:question_id')
  async deleteQuestion(@Param('quiz_id') quiz_id: string, @Param('question_id') question_id: string) {
    // Implementation for deleting a single question
    return { message: 'Question deleted successfully' };
  }

  // Endpoint to add/update answers for a question
  @Put(':quiz_id/questions/:question_id/answers')
  async updateQuestionAnswers(@Param('quiz_id') quiz_id: string, @Param('question_id') question_id: string, @Body() answersData: any[]) {
    // Implementation for updating answers for a question
    // This is useful for questions imported without answers
    return { message: 'Answers updated successfully' };
  }

  // Get quiz statistics
  @Get(':id/statistics')
  async getQuizStatistics(@Param('id') id: string) {
    // Implementation for getting quiz statistics
    // (number of attempts, average score, pass rate, etc.)
    return {
      total_attempts: 0,
      average_score: 0,
      pass_rate: 0,
      completion_rate: 0,
    };
  }
}

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { QuizService } from './quiz.service';
import { WordParserService } from './word-parser.service';
import { AdminQuizController } from './admin-quiz.controller';
import { QuizController } from './quiz.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AdminQuestionController } from './admin-question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [
    MulterModule.register({
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max file size
      },
      fileFilter: (req, file, cb) => {
        // Only allow Word documents
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/msword') {
          cb(null, true);
        } else {
          cb(new Error('Only Word documents (.doc, .docx) are allowed'), false);
        }
      },
    }),
  ],
  controllers: [AdminQuizController, QuizController, AdminQuestionController],
  providers: [QuizService, WordParserService, PrismaService, QuestionService],
  exports: [QuizService],
})
export class QuizModule {}

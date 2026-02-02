import { Injectable, BadRequestException } from '@nestjs/common';
import * as mammoth from 'mammoth';

interface ParsedQuestion {
  question_text: string;
  question_type: number;
  points: number;
  difficulty: number;
  explanation?: string;
  order: number;
  answers: {
    answer_text: string;
    is_correct: boolean;
    order: number;
  }[];
  has_answers: boolean;
}

interface ParsedQuiz {
  questions: ParsedQuestion[];
}

@Injectable()
export class WordParserService {
  async parseWordFile(buffer: Buffer): Promise<ParsedQuiz> {
    try {
      // Convert Word document to plain text
      const result = await mammoth.extractRawText({ buffer });
      const text = result.value;

      if (!text || text.trim().length === 0) {
        throw new BadRequestException('File Word trống hoặc không thể đọc');
      }

      // Split into lines and clean
      const lines = text
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      if (lines.length === 0) {
        throw new BadRequestException('Không tìm thấy nội dung trong file');
      }

      // Parse the document
      return this.parseContent(lines);
    } catch (error: any) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Lỗi khi parse file Word: ${error.message}`);
    }
  }

  // parse the content lines into questions and answers
  private parseContent(lines: string[]): ParsedQuiz {
    const questions: ParsedQuestion[] = [];
    let currentQuestion: ParsedQuestion | null = null;
    let questionNumber = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Tìm câu hỏi: "Câu 1." hoặc "1." hoặc "Question 1:"
      const questionMatch = line.match(/^(Câu\s*)?(\d+)[\.:\)]\s*(.+)$/i);
      if (questionMatch) {
        questionNumber++;

        // Lưu câu hỏi trước đó
        if (currentQuestion) {
          questions.push(currentQuestion);
        }

        currentQuestion = {
          question_text: questionMatch[3].trim(),
          question_type: 1, // Mặc định single choice
          points: 1,
          difficulty: 3,
          order: questionNumber - 1,
          answers: [],
          has_answers: false,
          explanation: undefined,
        };
        continue;
      }

      // Tìm đáp án: A. String [X], B. Number [X], C. Object, D. Boolean [X]
      // Regex cải tiến để nhận cả [X] và (*)
      const answerMatch = line.match(/^([A-D])[\.\)]\s*(.+?)(?:\s*\[X\]|\s*\(\*\)|\s*\*)?\s*$/i);

      if (answerMatch && currentQuestion) {
        const answerText = answerMatch[2].trim();

        // Kiểm tra có [X], (*) hoặc * ở cuối không
        const hasMarker = /\[X\]|\(\*\)|\*$/.test(line);

        currentQuestion.answers.push({
          answer_text: answerText,
          is_correct: hasMarker,
          order: answerMatch[1].charCodeAt(0) - 65, // A=0, B=1, C=2, D=3
        });

        // Nếu có nhiều đáp án đúng, chuyển thành multiple choice
        const correctCount = currentQuestion.answers.filter((a) => a.is_correct).length;
        if (correctCount > 1) {
          currentQuestion.question_type = 2; // Multiple choice
        }
        continue;
      }

      // Tìm giải thích: "Giải thích:" hoặc "Explanation:" hoặc "Note:"
      const explanationMatch = line.match(/^(?:Giải thích|Explanation|Note|Explain|Note:|Explanation:|Giải thích:)\s*[:.]?\s*(.+)$/i);
      if (explanationMatch && currentQuestion) {
        currentQuestion.explanation = explanationMatch[1].trim();
        continue;
      }

      // Nếu không phải câu hỏi mới, không phải đáp án, không phải giải thích
      // nhưng có currentQuestion, thì có thể là phần tiếp theo của câu hỏi
      if (currentQuestion && !questionMatch && !answerMatch && !explanationMatch) {
        // Kiểm tra xem có phải phần tiếp của câu hỏi không
        // (không bắt đầu bằng A., B., C., D. và không phải số thứ tự mới)
        if (!line.match(/^[A-D][\.\)]/) && !line.match(/^\d+[\.:\)]/)) {
          currentQuestion.question_text += ' ' + line;
        }
      }
    }

    // Lưu câu hỏi cuối cùng
    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    return { questions };
  }

  /**
   * Generate a Word template for quiz import
   */
  generateTemplate(): string {
    return `
HƯỚNG DẪN IMPORT QUIZ
=====================

Format câu hỏi:
- Mỗi câu hỏi bắt đầu bằng số thứ tự: 1., 2., 3., ...
- Mỗi đáp án bắt đầu bằng chữ cái: A., B., C., D., ...
- Đánh dấu đáp án đúng bằng: [X], (*), hoặc *text*
- Giải thích (tùy chọn): Giải thích: ...

VÍ DỤ MẪU 1 - Format cơ bản:

1. She _____ to the gym every morning.
A. go
B. goes [X]
C. going
D. gone
Giải thích: "She" là chủ ngữ số ít nên động từ phải thêm "s/es"

2. Which sentences are in Present Perfect tense?
A. I have finished my homework [X]
B. She has been to Paris [X]
C. They went to school
D. He is eating

3. The sentence "She will go to London tomorrow" is Future Simple.
A. True [X]
B. False

VÍ DỤ MẪU 2 - Format từ file exam:

1. She _____ agreed to go with him to the football match although she had no interest in the game at all.
A. apologetically
B. grudgingly [X]
C. shamefacedly
D. discreetly

2. On the way to Cambridge yesterday, the road was blocked by a fallen tree, so we had to make a _____
A. deviation
B. digression
C. detour [X]
D. departure
Giải thích: "detour" có nghĩa là đường vòng

CHÚ Ý QUAN TRỌNG:
- Mỗi đáp án PHẢI ở dòng riêng biệt
- Có khoảng trắng sau A., B., C., D.
- Đánh dấu [X] hoặc (*) ở SAU đáp án đúng
- Có thể đánh dấu nhiều đáp án đúng cho câu hỏi nhiều lựa chọn
- Giải thích có thể đặt sau đáp án cuối cùng
- Hỗ trợ cả format có hoặc không có dấu \ (Word tự động thêm)
    `.trim();
  }
}

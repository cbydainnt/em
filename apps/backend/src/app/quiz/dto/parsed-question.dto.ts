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

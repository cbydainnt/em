import { registerEnumType } from '@nestjs/graphql';

export enum AnswerScalarFieldEnum {
    answer_id = "answer_id",
    question_id = "question_id",
    answer_text = "answer_text",
    answer_image = "answer_image",
    is_correct = "is_correct",
    order = "order",
    match_key = "match_key",
    blank_position = "blank_position"
}


registerEnumType(AnswerScalarFieldEnum, { name: 'AnswerScalarFieldEnum', description: undefined })

import { registerEnumType } from '@nestjs/graphql';

export enum ReadingPassageScalarFieldEnum {
    reading_passage_id = "reading_passage_id",
    title = "title",
    content = "content",
    difficulty = "difficulty",
    tags = "tags",
    created_at = "created_at",
    updated_at = "updated_at",
    created_by = "created_by",
    updated_by = "updated_by",
    total_questions = "total_questions",
    question_ordering = "question_ordering"
}


registerEnumType(ReadingPassageScalarFieldEnum, { name: 'ReadingPassageScalarFieldEnum', description: undefined })

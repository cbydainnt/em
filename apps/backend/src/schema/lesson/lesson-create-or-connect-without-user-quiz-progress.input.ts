import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutUser_quiz_progressInput } from './lesson-create-without-user-quiz-progress.input';

@InputType()
export class LessonCreateOrConnectWithoutUser_quiz_progressInput {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonCreateWithoutUser_quiz_progressInput, {nullable:false})
    @Type(() => LessonCreateWithoutUser_quiz_progressInput)
    create!: LessonCreateWithoutUser_quiz_progressInput;
}

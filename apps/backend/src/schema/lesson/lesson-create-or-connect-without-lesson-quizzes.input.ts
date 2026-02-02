import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutLesson_quizzesInput } from './lesson-create-without-lesson-quizzes.input';

@InputType()
export class LessonCreateOrConnectWithoutLesson_quizzesInput {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonCreateWithoutLesson_quizzesInput, {nullable:false})
    @Type(() => LessonCreateWithoutLesson_quizzesInput)
    create!: LessonCreateWithoutLesson_quizzesInput;
}

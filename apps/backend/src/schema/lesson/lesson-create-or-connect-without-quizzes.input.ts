import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutQuizzesInput } from './lesson-create-without-quizzes.input';

@InputType()
export class LessonCreateOrConnectWithoutQuizzesInput {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonCreateWithoutQuizzesInput, {nullable:false})
    @Type(() => LessonCreateWithoutQuizzesInput)
    create!: LessonCreateWithoutQuizzesInput;
}

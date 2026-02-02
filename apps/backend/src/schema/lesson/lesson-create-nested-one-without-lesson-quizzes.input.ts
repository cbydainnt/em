import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutLesson_quizzesInput } from './lesson-create-without-lesson-quizzes.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutLesson_quizzesInput } from './lesson-create-or-connect-without-lesson-quizzes.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';

@InputType()
export class LessonCreateNestedOneWithoutLesson_quizzesInput {

    @Field(() => LessonCreateWithoutLesson_quizzesInput, {nullable:true})
    @Type(() => LessonCreateWithoutLesson_quizzesInput)
    create?: LessonCreateWithoutLesson_quizzesInput;

    @Field(() => LessonCreateOrConnectWithoutLesson_quizzesInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutLesson_quizzesInput)
    connectOrCreate?: LessonCreateOrConnectWithoutLesson_quizzesInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;
}

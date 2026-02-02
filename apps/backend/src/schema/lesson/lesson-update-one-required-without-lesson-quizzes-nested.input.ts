import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutLesson_quizzesInput } from './lesson-create-without-lesson-quizzes.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutLesson_quizzesInput } from './lesson-create-or-connect-without-lesson-quizzes.input';
import { LessonUpsertWithoutLesson_quizzesInput } from './lesson-upsert-without-lesson-quizzes.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { LessonUpdateToOneWithWhereWithoutLesson_quizzesInput } from './lesson-update-to-one-with-where-without-lesson-quizzes.input';

@InputType()
export class LessonUpdateOneRequiredWithoutLesson_quizzesNestedInput {

    @Field(() => LessonCreateWithoutLesson_quizzesInput, {nullable:true})
    @Type(() => LessonCreateWithoutLesson_quizzesInput)
    create?: LessonCreateWithoutLesson_quizzesInput;

    @Field(() => LessonCreateOrConnectWithoutLesson_quizzesInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutLesson_quizzesInput)
    connectOrCreate?: LessonCreateOrConnectWithoutLesson_quizzesInput;

    @Field(() => LessonUpsertWithoutLesson_quizzesInput, {nullable:true})
    @Type(() => LessonUpsertWithoutLesson_quizzesInput)
    upsert?: LessonUpsertWithoutLesson_quizzesInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonUpdateToOneWithWhereWithoutLesson_quizzesInput, {nullable:true})
    @Type(() => LessonUpdateToOneWithWhereWithoutLesson_quizzesInput)
    update?: LessonUpdateToOneWithWhereWithoutLesson_quizzesInput;
}

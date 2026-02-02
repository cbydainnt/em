import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonQuizCreateWithoutQuizInput } from './lesson-quiz-create-without-quiz.input';
import { Type } from 'class-transformer';
import { LessonQuizCreateOrConnectWithoutQuizInput } from './lesson-quiz-create-or-connect-without-quiz.input';
import { LessonQuizCreateManyQuizInputEnvelope } from './lesson-quiz-create-many-quiz-input-envelope.input';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';

@InputType()
export class LessonQuizCreateNestedManyWithoutQuizInput {

    @Field(() => [LessonQuizCreateWithoutQuizInput], {nullable:true})
    @Type(() => LessonQuizCreateWithoutQuizInput)
    create?: Array<LessonQuizCreateWithoutQuizInput>;

    @Field(() => [LessonQuizCreateOrConnectWithoutQuizInput], {nullable:true})
    @Type(() => LessonQuizCreateOrConnectWithoutQuizInput)
    connectOrCreate?: Array<LessonQuizCreateOrConnectWithoutQuizInput>;

    @Field(() => LessonQuizCreateManyQuizInputEnvelope, {nullable:true})
    @Type(() => LessonQuizCreateManyQuizInputEnvelope)
    createMany?: LessonQuizCreateManyQuizInputEnvelope;

    @Field(() => [LessonQuizWhereUniqueInput], {nullable:true})
    @Type(() => LessonQuizWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>>;
}

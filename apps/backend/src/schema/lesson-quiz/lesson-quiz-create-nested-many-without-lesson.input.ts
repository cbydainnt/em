import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonQuizCreateWithoutLessonInput } from './lesson-quiz-create-without-lesson.input';
import { Type } from 'class-transformer';
import { LessonQuizCreateOrConnectWithoutLessonInput } from './lesson-quiz-create-or-connect-without-lesson.input';
import { LessonQuizCreateManyLessonInputEnvelope } from './lesson-quiz-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';

@InputType()
export class LessonQuizCreateNestedManyWithoutLessonInput {

    @Field(() => [LessonQuizCreateWithoutLessonInput], {nullable:true})
    @Type(() => LessonQuizCreateWithoutLessonInput)
    create?: Array<LessonQuizCreateWithoutLessonInput>;

    @Field(() => [LessonQuizCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => LessonQuizCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<LessonQuizCreateOrConnectWithoutLessonInput>;

    @Field(() => LessonQuizCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => LessonQuizCreateManyLessonInputEnvelope)
    createMany?: LessonQuizCreateManyLessonInputEnvelope;

    @Field(() => [LessonQuizWhereUniqueInput], {nullable:true})
    @Type(() => LessonQuizWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>>;
}

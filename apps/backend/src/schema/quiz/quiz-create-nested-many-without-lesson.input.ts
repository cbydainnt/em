import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutLessonInput } from './quiz-create-without-lesson.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutLessonInput } from './quiz-create-or-connect-without-lesson.input';
import { QuizCreateManyLessonInputEnvelope } from './quiz-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';

@InputType()
export class QuizCreateNestedManyWithoutLessonInput {

    @Field(() => [QuizCreateWithoutLessonInput], {nullable:true})
    @Type(() => QuizCreateWithoutLessonInput)
    create?: Array<QuizCreateWithoutLessonInput>;

    @Field(() => [QuizCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<QuizCreateOrConnectWithoutLessonInput>;

    @Field(() => QuizCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => QuizCreateManyLessonInputEnvelope)
    createMany?: QuizCreateManyLessonInputEnvelope;

    @Field(() => [QuizWhereUniqueInput], {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>>;
}

import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutCourseInput } from './quiz-create-without-course.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutCourseInput } from './quiz-create-or-connect-without-course.input';
import { QuizCreateManyCourseInputEnvelope } from './quiz-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';

@InputType()
export class QuizCreateNestedManyWithoutCourseInput {

    @Field(() => [QuizCreateWithoutCourseInput], {nullable:true})
    @Type(() => QuizCreateWithoutCourseInput)
    create?: Array<QuizCreateWithoutCourseInput>;

    @Field(() => [QuizCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<QuizCreateOrConnectWithoutCourseInput>;

    @Field(() => QuizCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => QuizCreateManyCourseInputEnvelope)
    createMany?: QuizCreateManyCourseInputEnvelope;

    @Field(() => [QuizWhereUniqueInput], {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>>;
}

import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutCourseInput } from './quiz-create-without-course.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutCourseInput } from './quiz-create-or-connect-without-course.input';
import { QuizUpsertWithWhereUniqueWithoutCourseInput } from './quiz-upsert-with-where-unique-without-course.input';
import { QuizCreateManyCourseInputEnvelope } from './quiz-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { QuizUpdateWithWhereUniqueWithoutCourseInput } from './quiz-update-with-where-unique-without-course.input';
import { QuizUpdateManyWithWhereWithoutCourseInput } from './quiz-update-many-with-where-without-course.input';
import { QuizScalarWhereInput } from './quiz-scalar-where.input';

@InputType()
export class QuizUncheckedUpdateManyWithoutCourseNestedInput {

    @Field(() => [QuizCreateWithoutCourseInput], {nullable:true})
    @Type(() => QuizCreateWithoutCourseInput)
    create?: Array<QuizCreateWithoutCourseInput>;

    @Field(() => [QuizCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<QuizCreateOrConnectWithoutCourseInput>;

    @Field(() => [QuizUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => QuizUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<QuizUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => QuizCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => QuizCreateManyCourseInputEnvelope)
    createMany?: QuizCreateManyCourseInputEnvelope;

    @Field(() => [QuizWhereUniqueInput], {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    set?: Array<Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>>;

    @Field(() => [QuizWhereUniqueInput], {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>>;

    @Field(() => [QuizWhereUniqueInput], {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>>;

    @Field(() => [QuizWhereUniqueInput], {nullable:true})
    @Type(() => QuizWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>>;

    @Field(() => [QuizUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => QuizUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<QuizUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [QuizUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => QuizUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<QuizUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [QuizScalarWhereInput], {nullable:true})
    @Type(() => QuizScalarWhereInput)
    deleteMany?: Array<QuizScalarWhereInput>;
}

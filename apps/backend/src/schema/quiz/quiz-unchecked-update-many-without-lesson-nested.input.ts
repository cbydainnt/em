import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { QuizCreateWithoutLessonInput } from './quiz-create-without-lesson.input';
import { Type } from 'class-transformer';
import { QuizCreateOrConnectWithoutLessonInput } from './quiz-create-or-connect-without-lesson.input';
import { QuizUpsertWithWhereUniqueWithoutLessonInput } from './quiz-upsert-with-where-unique-without-lesson.input';
import { QuizCreateManyLessonInputEnvelope } from './quiz-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { QuizUpdateWithWhereUniqueWithoutLessonInput } from './quiz-update-with-where-unique-without-lesson.input';
import { QuizUpdateManyWithWhereWithoutLessonInput } from './quiz-update-many-with-where-without-lesson.input';
import { QuizScalarWhereInput } from './quiz-scalar-where.input';

@InputType()
export class QuizUncheckedUpdateManyWithoutLessonNestedInput {

    @Field(() => [QuizCreateWithoutLessonInput], {nullable:true})
    @Type(() => QuizCreateWithoutLessonInput)
    create?: Array<QuizCreateWithoutLessonInput>;

    @Field(() => [QuizCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => QuizCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<QuizCreateOrConnectWithoutLessonInput>;

    @Field(() => [QuizUpsertWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => QuizUpsertWithWhereUniqueWithoutLessonInput)
    upsert?: Array<QuizUpsertWithWhereUniqueWithoutLessonInput>;

    @Field(() => QuizCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => QuizCreateManyLessonInputEnvelope)
    createMany?: QuizCreateManyLessonInputEnvelope;

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

    @Field(() => [QuizUpdateWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => QuizUpdateWithWhereUniqueWithoutLessonInput)
    update?: Array<QuizUpdateWithWhereUniqueWithoutLessonInput>;

    @Field(() => [QuizUpdateManyWithWhereWithoutLessonInput], {nullable:true})
    @Type(() => QuizUpdateManyWithWhereWithoutLessonInput)
    updateMany?: Array<QuizUpdateManyWithWhereWithoutLessonInput>;

    @Field(() => [QuizScalarWhereInput], {nullable:true})
    @Type(() => QuizScalarWhereInput)
    deleteMany?: Array<QuizScalarWhereInput>;
}

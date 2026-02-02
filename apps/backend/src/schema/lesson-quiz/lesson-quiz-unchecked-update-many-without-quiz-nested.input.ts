import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonQuizCreateWithoutQuizInput } from './lesson-quiz-create-without-quiz.input';
import { Type } from 'class-transformer';
import { LessonQuizCreateOrConnectWithoutQuizInput } from './lesson-quiz-create-or-connect-without-quiz.input';
import { LessonQuizUpsertWithWhereUniqueWithoutQuizInput } from './lesson-quiz-upsert-with-where-unique-without-quiz.input';
import { LessonQuizCreateManyQuizInputEnvelope } from './lesson-quiz-create-many-quiz-input-envelope.input';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';
import { LessonQuizUpdateWithWhereUniqueWithoutQuizInput } from './lesson-quiz-update-with-where-unique-without-quiz.input';
import { LessonQuizUpdateManyWithWhereWithoutQuizInput } from './lesson-quiz-update-many-with-where-without-quiz.input';
import { LessonQuizScalarWhereInput } from './lesson-quiz-scalar-where.input';

@InputType()
export class LessonQuizUncheckedUpdateManyWithoutQuizNestedInput {

    @Field(() => [LessonQuizCreateWithoutQuizInput], {nullable:true})
    @Type(() => LessonQuizCreateWithoutQuizInput)
    create?: Array<LessonQuizCreateWithoutQuizInput>;

    @Field(() => [LessonQuizCreateOrConnectWithoutQuizInput], {nullable:true})
    @Type(() => LessonQuizCreateOrConnectWithoutQuizInput)
    connectOrCreate?: Array<LessonQuizCreateOrConnectWithoutQuizInput>;

    @Field(() => [LessonQuizUpsertWithWhereUniqueWithoutQuizInput], {nullable:true})
    @Type(() => LessonQuizUpsertWithWhereUniqueWithoutQuizInput)
    upsert?: Array<LessonQuizUpsertWithWhereUniqueWithoutQuizInput>;

    @Field(() => LessonQuizCreateManyQuizInputEnvelope, {nullable:true})
    @Type(() => LessonQuizCreateManyQuizInputEnvelope)
    createMany?: LessonQuizCreateManyQuizInputEnvelope;

    @Field(() => [LessonQuizWhereUniqueInput], {nullable:true})
    @Type(() => LessonQuizWhereUniqueInput)
    set?: Array<Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>>;

    @Field(() => [LessonQuizWhereUniqueInput], {nullable:true})
    @Type(() => LessonQuizWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>>;

    @Field(() => [LessonQuizWhereUniqueInput], {nullable:true})
    @Type(() => LessonQuizWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>>;

    @Field(() => [LessonQuizWhereUniqueInput], {nullable:true})
    @Type(() => LessonQuizWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>>;

    @Field(() => [LessonQuizUpdateWithWhereUniqueWithoutQuizInput], {nullable:true})
    @Type(() => LessonQuizUpdateWithWhereUniqueWithoutQuizInput)
    update?: Array<LessonQuizUpdateWithWhereUniqueWithoutQuizInput>;

    @Field(() => [LessonQuizUpdateManyWithWhereWithoutQuizInput], {nullable:true})
    @Type(() => LessonQuizUpdateManyWithWhereWithoutQuizInput)
    updateMany?: Array<LessonQuizUpdateManyWithWhereWithoutQuizInput>;

    @Field(() => [LessonQuizScalarWhereInput], {nullable:true})
    @Type(() => LessonQuizScalarWhereInput)
    deleteMany?: Array<LessonQuizScalarWhereInput>;
}

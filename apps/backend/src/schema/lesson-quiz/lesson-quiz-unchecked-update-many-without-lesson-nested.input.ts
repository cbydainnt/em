import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonQuizCreateWithoutLessonInput } from './lesson-quiz-create-without-lesson.input';
import { Type } from 'class-transformer';
import { LessonQuizCreateOrConnectWithoutLessonInput } from './lesson-quiz-create-or-connect-without-lesson.input';
import { LessonQuizUpsertWithWhereUniqueWithoutLessonInput } from './lesson-quiz-upsert-with-where-unique-without-lesson.input';
import { LessonQuizCreateManyLessonInputEnvelope } from './lesson-quiz-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';
import { LessonQuizUpdateWithWhereUniqueWithoutLessonInput } from './lesson-quiz-update-with-where-unique-without-lesson.input';
import { LessonQuizUpdateManyWithWhereWithoutLessonInput } from './lesson-quiz-update-many-with-where-without-lesson.input';
import { LessonQuizScalarWhereInput } from './lesson-quiz-scalar-where.input';

@InputType()
export class LessonQuizUncheckedUpdateManyWithoutLessonNestedInput {

    @Field(() => [LessonQuizCreateWithoutLessonInput], {nullable:true})
    @Type(() => LessonQuizCreateWithoutLessonInput)
    create?: Array<LessonQuizCreateWithoutLessonInput>;

    @Field(() => [LessonQuizCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => LessonQuizCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<LessonQuizCreateOrConnectWithoutLessonInput>;

    @Field(() => [LessonQuizUpsertWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => LessonQuizUpsertWithWhereUniqueWithoutLessonInput)
    upsert?: Array<LessonQuizUpsertWithWhereUniqueWithoutLessonInput>;

    @Field(() => LessonQuizCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => LessonQuizCreateManyLessonInputEnvelope)
    createMany?: LessonQuizCreateManyLessonInputEnvelope;

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

    @Field(() => [LessonQuizUpdateWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => LessonQuizUpdateWithWhereUniqueWithoutLessonInput)
    update?: Array<LessonQuizUpdateWithWhereUniqueWithoutLessonInput>;

    @Field(() => [LessonQuizUpdateManyWithWhereWithoutLessonInput], {nullable:true})
    @Type(() => LessonQuizUpdateManyWithWhereWithoutLessonInput)
    updateMany?: Array<LessonQuizUpdateManyWithWhereWithoutLessonInput>;

    @Field(() => [LessonQuizScalarWhereInput], {nullable:true})
    @Type(() => LessonQuizScalarWhereInput)
    deleteMany?: Array<LessonQuizScalarWhereInput>;
}

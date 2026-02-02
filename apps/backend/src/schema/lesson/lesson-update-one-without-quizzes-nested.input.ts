import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutQuizzesInput } from './lesson-create-without-quizzes.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutQuizzesInput } from './lesson-create-or-connect-without-quizzes.input';
import { LessonUpsertWithoutQuizzesInput } from './lesson-upsert-without-quizzes.input';
import { LessonWhereInput } from './lesson-where.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { LessonUpdateToOneWithWhereWithoutQuizzesInput } from './lesson-update-to-one-with-where-without-quizzes.input';

@InputType()
export class LessonUpdateOneWithoutQuizzesNestedInput {

    @Field(() => LessonCreateWithoutQuizzesInput, {nullable:true})
    @Type(() => LessonCreateWithoutQuizzesInput)
    create?: LessonCreateWithoutQuizzesInput;

    @Field(() => LessonCreateOrConnectWithoutQuizzesInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutQuizzesInput)
    connectOrCreate?: LessonCreateOrConnectWithoutQuizzesInput;

    @Field(() => LessonUpsertWithoutQuizzesInput, {nullable:true})
    @Type(() => LessonUpsertWithoutQuizzesInput)
    upsert?: LessonUpsertWithoutQuizzesInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    delete?: LessonWhereInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonUpdateToOneWithWhereWithoutQuizzesInput, {nullable:true})
    @Type(() => LessonUpdateToOneWithWhereWithoutQuizzesInput)
    update?: LessonUpdateToOneWithWhereWithoutQuizzesInput;
}

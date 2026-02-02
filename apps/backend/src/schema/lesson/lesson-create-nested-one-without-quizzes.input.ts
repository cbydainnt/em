import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutQuizzesInput } from './lesson-create-without-quizzes.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutQuizzesInput } from './lesson-create-or-connect-without-quizzes.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';

@InputType()
export class LessonCreateNestedOneWithoutQuizzesInput {

    @Field(() => LessonCreateWithoutQuizzesInput, {nullable:true})
    @Type(() => LessonCreateWithoutQuizzesInput)
    create?: LessonCreateWithoutQuizzesInput;

    @Field(() => LessonCreateOrConnectWithoutQuizzesInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutQuizzesInput)
    connectOrCreate?: LessonCreateOrConnectWithoutQuizzesInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;
}

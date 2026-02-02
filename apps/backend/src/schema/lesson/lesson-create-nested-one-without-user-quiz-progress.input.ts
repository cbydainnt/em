import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutUser_quiz_progressInput } from './lesson-create-without-user-quiz-progress.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutUser_quiz_progressInput } from './lesson-create-or-connect-without-user-quiz-progress.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';

@InputType()
export class LessonCreateNestedOneWithoutUser_quiz_progressInput {

    @Field(() => LessonCreateWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => LessonCreateWithoutUser_quiz_progressInput)
    create?: LessonCreateWithoutUser_quiz_progressInput;

    @Field(() => LessonCreateOrConnectWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutUser_quiz_progressInput)
    connectOrCreate?: LessonCreateOrConnectWithoutUser_quiz_progressInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;
}

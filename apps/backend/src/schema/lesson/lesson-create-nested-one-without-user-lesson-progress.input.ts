import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutUser_lesson_progressInput } from './lesson-create-without-user-lesson-progress.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutUser_lesson_progressInput } from './lesson-create-or-connect-without-user-lesson-progress.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';

@InputType()
export class LessonCreateNestedOneWithoutUser_lesson_progressInput {

    @Field(() => LessonCreateWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => LessonCreateWithoutUser_lesson_progressInput)
    create?: LessonCreateWithoutUser_lesson_progressInput;

    @Field(() => LessonCreateOrConnectWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutUser_lesson_progressInput)
    connectOrCreate?: LessonCreateOrConnectWithoutUser_lesson_progressInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;
}

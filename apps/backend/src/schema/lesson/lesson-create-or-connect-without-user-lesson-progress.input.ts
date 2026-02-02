import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutUser_lesson_progressInput } from './lesson-create-without-user-lesson-progress.input';

@InputType()
export class LessonCreateOrConnectWithoutUser_lesson_progressInput {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonCreateWithoutUser_lesson_progressInput, {nullable:false})
    @Type(() => LessonCreateWithoutUser_lesson_progressInput)
    create!: LessonCreateWithoutUser_lesson_progressInput;
}

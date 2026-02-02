import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutCommentsInput } from './lesson-create-without-comments.input';

@InputType()
export class LessonCreateOrConnectWithoutCommentsInput {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonCreateWithoutCommentsInput, {nullable:false})
    @Type(() => LessonCreateWithoutCommentsInput)
    create!: LessonCreateWithoutCommentsInput;
}

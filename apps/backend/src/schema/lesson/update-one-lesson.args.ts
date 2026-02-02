import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonUpdateInput } from './lesson-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';

@ArgsType()
export class UpdateOneLessonArgs {

    @Field(() => LessonUpdateInput, {nullable:false})
    @Type(() => LessonUpdateInput)
    data!: LessonUpdateInput;

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;
}

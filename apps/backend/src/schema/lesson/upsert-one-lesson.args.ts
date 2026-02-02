import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonCreateInput } from './lesson-create.input';
import { LessonUpdateInput } from './lesson-update.input';

@ArgsType()
export class UpsertOneLessonArgs {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonCreateInput, {nullable:false})
    @Type(() => LessonCreateInput)
    create!: LessonCreateInput;

    @Field(() => LessonUpdateInput, {nullable:false})
    @Type(() => LessonUpdateInput)
    update!: LessonUpdateInput;
}

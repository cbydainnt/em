import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';
import { LessonOrderByWithRelationInput } from './lesson-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Int } from '@nestjs/graphql';
import { LessonScalarFieldEnum } from './lesson-scalar-field.enum';

@ArgsType()
export class FindFirstLessonOrThrowArgs {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;

    @Field(() => [LessonOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<LessonOrderByWithRelationInput>;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [LessonScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof LessonScalarFieldEnum>;
}

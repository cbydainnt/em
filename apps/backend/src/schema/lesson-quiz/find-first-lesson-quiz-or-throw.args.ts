import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { LessonQuizWhereInput } from './lesson-quiz-where.input';
import { Type } from 'class-transformer';
import { LessonQuizOrderByWithRelationInput } from './lesson-quiz-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { LessonQuizWhereUniqueInput } from './lesson-quiz-where-unique.input';
import { Int } from '@nestjs/graphql';
import { LessonQuizScalarFieldEnum } from './lesson-quiz-scalar-field.enum';

@ArgsType()
export class FindFirstLessonQuizOrThrowArgs {

    @Field(() => LessonQuizWhereInput, {nullable:true})
    @Type(() => LessonQuizWhereInput)
    where?: LessonQuizWhereInput;

    @Field(() => [LessonQuizOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<LessonQuizOrderByWithRelationInput>;

    @Field(() => LessonQuizWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<LessonQuizWhereUniqueInput, 'id' | 'lesson_id_quiz_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [LessonQuizScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof LessonQuizScalarFieldEnum>;
}

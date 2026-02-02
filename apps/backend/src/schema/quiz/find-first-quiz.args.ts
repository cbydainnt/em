import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuizWhereInput } from './quiz-where.input';
import { Type } from 'class-transformer';
import { QuizOrderByWithRelationInput } from './quiz-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { QuizWhereUniqueInput } from './quiz-where-unique.input';
import { Int } from '@nestjs/graphql';
import { QuizScalarFieldEnum } from './quiz-scalar-field.enum';

@ArgsType()
export class FindFirstQuizArgs {

    @Field(() => QuizWhereInput, {nullable:true})
    @Type(() => QuizWhereInput)
    where?: QuizWhereInput;

    @Field(() => [QuizOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<QuizOrderByWithRelationInput>;

    @Field(() => QuizWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<QuizWhereUniqueInput, 'quiz_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [QuizScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof QuizScalarFieldEnum>;
}

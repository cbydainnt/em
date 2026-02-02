import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { QuestionWhereInput } from './question-where.input';
import { Type } from 'class-transformer';
import { QuestionOrderByWithRelationInput } from './question-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { QuestionWhereUniqueInput } from './question-where-unique.input';
import { Int } from '@nestjs/graphql';
import { QuestionScalarFieldEnum } from './question-scalar-field.enum';

@ArgsType()
export class FindFirstQuestionArgs {

    @Field(() => QuestionWhereInput, {nullable:true})
    @Type(() => QuestionWhereInput)
    where?: QuestionWhereInput;

    @Field(() => [QuestionOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<QuestionOrderByWithRelationInput>;

    @Field(() => QuestionWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<QuestionWhereUniqueInput, 'question_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [QuestionScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof QuestionScalarFieldEnum>;
}

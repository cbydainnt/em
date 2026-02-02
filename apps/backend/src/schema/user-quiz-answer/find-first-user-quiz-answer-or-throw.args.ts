import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizAnswerWhereInput } from './user-quiz-answer-where.input';
import { Type } from 'class-transformer';
import { UserQuizAnswerOrderByWithRelationInput } from './user-quiz-answer-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { UserQuizAnswerWhereUniqueInput } from './user-quiz-answer-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UserQuizAnswerScalarFieldEnum } from './user-quiz-answer-scalar-field.enum';

@ArgsType()
export class FindFirstUserQuizAnswerOrThrowArgs {

    @Field(() => UserQuizAnswerWhereInput, {nullable:true})
    @Type(() => UserQuizAnswerWhereInput)
    where?: UserQuizAnswerWhereInput;

    @Field(() => [UserQuizAnswerOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserQuizAnswerOrderByWithRelationInput>;

    @Field(() => UserQuizAnswerWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserQuizAnswerWhereUniqueInput, 'id' | 'progress_id_question_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [UserQuizAnswerScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof UserQuizAnswerScalarFieldEnum>;
}

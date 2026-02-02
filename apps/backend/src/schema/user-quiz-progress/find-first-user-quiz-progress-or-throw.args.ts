import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizProgressWhereInput } from './user-quiz-progress-where.input';
import { Type } from 'class-transformer';
import { UserQuizProgressOrderByWithRelationInput } from './user-quiz-progress-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { UserQuizProgressWhereUniqueInput } from './user-quiz-progress-where-unique.input';
import { Int } from '@nestjs/graphql';
import { UserQuizProgressScalarFieldEnum } from './user-quiz-progress-scalar-field.enum';

@ArgsType()
export class FindFirstUserQuizProgressOrThrowArgs {

    @Field(() => UserQuizProgressWhereInput, {nullable:true})
    @Type(() => UserQuizProgressWhereInput)
    where?: UserQuizProgressWhereInput;

    @Field(() => [UserQuizProgressOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<UserQuizProgressOrderByWithRelationInput>;

    @Field(() => UserQuizProgressWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<UserQuizProgressWhereUniqueInput, 'progress_id' | 'user_id_quiz_id_lesson_id_attempts'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [UserQuizProgressScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof UserQuizProgressScalarFieldEnum>;
}

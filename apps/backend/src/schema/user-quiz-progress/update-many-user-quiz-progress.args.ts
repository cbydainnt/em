import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizProgressUpdateManyMutationInput } from './user-quiz-progress-update-many-mutation.input';
import { Type } from 'class-transformer';
import { UserQuizProgressWhereInput } from './user-quiz-progress-where.input';

@ArgsType()
export class UpdateManyUserQuizProgressArgs {

    @Field(() => UserQuizProgressUpdateManyMutationInput, {nullable:false})
    @Type(() => UserQuizProgressUpdateManyMutationInput)
    data!: UserQuizProgressUpdateManyMutationInput;

    @Field(() => UserQuizProgressWhereInput, {nullable:true})
    @Type(() => UserQuizProgressWhereInput)
    where?: UserQuizProgressWhereInput;
}

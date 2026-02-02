import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserQuizProgressCreateInput } from './user-quiz-progress-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneUserQuizProgressArgs {

    @Field(() => UserQuizProgressCreateInput, {nullable:false})
    @Type(() => UserQuizProgressCreateInput)
    data!: UserQuizProgressCreateInput;
}

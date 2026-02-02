import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserQuizProgressScalarWhereInput } from './user-quiz-progress-scalar-where.input';
import { Type } from 'class-transformer';
import { UserQuizProgressUpdateManyMutationInput } from './user-quiz-progress-update-many-mutation.input';

@InputType()
export class UserQuizProgressUpdateManyWithWhereWithoutQuizInput {

    @Field(() => UserQuizProgressScalarWhereInput, {nullable:false})
    @Type(() => UserQuizProgressScalarWhereInput)
    where!: UserQuizProgressScalarWhereInput;

    @Field(() => UserQuizProgressUpdateManyMutationInput, {nullable:false})
    @Type(() => UserQuizProgressUpdateManyMutationInput)
    data!: UserQuizProgressUpdateManyMutationInput;
}

import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AnswerUpdateManyMutationInput } from './answer-update-many-mutation.input';
import { Type } from 'class-transformer';
import { AnswerWhereInput } from './answer-where.input';

@ArgsType()
export class UpdateManyAnswerArgs {

    @Field(() => AnswerUpdateManyMutationInput, {nullable:false})
    @Type(() => AnswerUpdateManyMutationInput)
    data!: AnswerUpdateManyMutationInput;

    @Field(() => AnswerWhereInput, {nullable:true})
    @Type(() => AnswerWhereInput)
    where?: AnswerWhereInput;
}

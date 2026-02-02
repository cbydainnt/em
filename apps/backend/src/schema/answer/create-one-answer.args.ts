import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AnswerCreateInput } from './answer-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneAnswerArgs {

    @Field(() => AnswerCreateInput, {nullable:false})
    @Type(() => AnswerCreateInput)
    data!: AnswerCreateInput;
}

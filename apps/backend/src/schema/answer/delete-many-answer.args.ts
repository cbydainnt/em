import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AnswerWhereInput } from './answer-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyAnswerArgs {

    @Field(() => AnswerWhereInput, {nullable:true})
    @Type(() => AnswerWhereInput)
    where?: AnswerWhereInput;
}

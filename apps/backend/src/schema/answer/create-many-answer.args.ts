import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { AnswerCreateManyInput } from './answer-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyAnswerArgs {

    @Field(() => [AnswerCreateManyInput], {nullable:false})
    @Type(() => AnswerCreateManyInput)
    data!: Array<AnswerCreateManyInput>;
}

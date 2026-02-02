import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ActiveCodeWhereInput } from './active-code-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyActiveCodeArgs {

    @Field(() => ActiveCodeWhereInput, {nullable:true})
    @Type(() => ActiveCodeWhereInput)
    where?: ActiveCodeWhereInput;
}

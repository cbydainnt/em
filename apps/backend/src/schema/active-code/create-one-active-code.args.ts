import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ActiveCodeCreateInput } from './active-code-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneActiveCodeArgs {

    @Field(() => ActiveCodeCreateInput, {nullable:false})
    @Type(() => ActiveCodeCreateInput)
    data!: ActiveCodeCreateInput;
}

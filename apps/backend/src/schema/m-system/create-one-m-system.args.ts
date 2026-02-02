import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MSystemCreateInput } from './m-system-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneMSystemArgs {

    @Field(() => MSystemCreateInput, {nullable:false})
    @Type(() => MSystemCreateInput)
    data!: MSystemCreateInput;
}

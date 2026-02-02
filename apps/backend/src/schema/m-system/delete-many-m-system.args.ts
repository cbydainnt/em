import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MSystemWhereInput } from './m-system-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyMSystemArgs {

    @Field(() => MSystemWhereInput, {nullable:true})
    @Type(() => MSystemWhereInput)
    where?: MSystemWhereInput;
}

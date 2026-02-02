import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MSystemCreateManyInput } from './m-system-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyMSystemArgs {

    @Field(() => [MSystemCreateManyInput], {nullable:false})
    @Type(() => MSystemCreateManyInput)
    data!: Array<MSystemCreateManyInput>;
}

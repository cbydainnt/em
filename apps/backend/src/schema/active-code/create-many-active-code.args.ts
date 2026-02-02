import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ActiveCodeCreateManyInput } from './active-code-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyActiveCodeArgs {

    @Field(() => [ActiveCodeCreateManyInput], {nullable:false})
    @Type(() => ActiveCodeCreateManyInput)
    data!: Array<ActiveCodeCreateManyInput>;
}

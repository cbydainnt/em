import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboCreateInput } from './combo-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneComboArgs {

    @Field(() => ComboCreateInput, {nullable:false})
    @Type(() => ComboCreateInput)
    data!: ComboCreateInput;
}

import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboCreateManyInput } from './combo-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyComboArgs {

    @Field(() => [ComboCreateManyInput], {nullable:false})
    @Type(() => ComboCreateManyInput)
    data!: Array<ComboCreateManyInput>;
}

import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CategoryComboCreateInput } from './category-combo-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneCategoryComboArgs {

    @Field(() => CategoryComboCreateInput, {nullable:false})
    @Type(() => CategoryComboCreateInput)
    data!: CategoryComboCreateInput;
}

import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CategoryComboUncheckedUpdateManyInput } from './category-combo-unchecked-update-many.input';
import { Type } from 'class-transformer';
import { CategoryComboWhereInput } from './category-combo-where.input';

@ArgsType()
export class UpdateManyCategoryComboArgs {

    @Field(() => CategoryComboUncheckedUpdateManyInput, {nullable:false})
    @Type(() => CategoryComboUncheckedUpdateManyInput)
    data!: CategoryComboUncheckedUpdateManyInput;

    @Field(() => CategoryComboWhereInput, {nullable:true})
    @Type(() => CategoryComboWhereInput)
    where?: CategoryComboWhereInput;
}

import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CategoryComboWhereInput } from './category-combo-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyCategoryComboArgs {

    @Field(() => CategoryComboWhereInput, {nullable:true})
    @Type(() => CategoryComboWhereInput)
    where?: CategoryComboWhereInput;
}

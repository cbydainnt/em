import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboWhereInput } from './combo-where.input';
import { Type } from 'class-transformer';
import { ComboUpdateWithoutCategoriesInput } from './combo-update-without-categories.input';

@InputType()
export class ComboUpdateToOneWithWhereWithoutCategoriesInput {

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;

    @Field(() => ComboUpdateWithoutCategoriesInput, {nullable:false})
    @Type(() => ComboUpdateWithoutCategoriesInput)
    data!: ComboUpdateWithoutCategoriesInput;
}

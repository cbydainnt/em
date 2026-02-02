import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboUpdateWithoutCategoriesInput } from './combo-update-without-categories.input';
import { Type } from 'class-transformer';
import { ComboCreateWithoutCategoriesInput } from './combo-create-without-categories.input';
import { ComboWhereInput } from './combo-where.input';

@InputType()
export class ComboUpsertWithoutCategoriesInput {

    @Field(() => ComboUpdateWithoutCategoriesInput, {nullable:false})
    @Type(() => ComboUpdateWithoutCategoriesInput)
    update!: ComboUpdateWithoutCategoriesInput;

    @Field(() => ComboCreateWithoutCategoriesInput, {nullable:false})
    @Type(() => ComboCreateWithoutCategoriesInput)
    create!: ComboCreateWithoutCategoriesInput;

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;
}

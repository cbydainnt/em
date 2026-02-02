import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboUpdateWithoutOrder_itemsInput } from './combo-update-without-order-items.input';
import { Type } from 'class-transformer';
import { ComboCreateWithoutOrder_itemsInput } from './combo-create-without-order-items.input';
import { ComboWhereInput } from './combo-where.input';

@InputType()
export class ComboUpsertWithoutOrder_itemsInput {

    @Field(() => ComboUpdateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => ComboUpdateWithoutOrder_itemsInput)
    update!: ComboUpdateWithoutOrder_itemsInput;

    @Field(() => ComboCreateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => ComboCreateWithoutOrder_itemsInput)
    create!: ComboCreateWithoutOrder_itemsInput;

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;
}

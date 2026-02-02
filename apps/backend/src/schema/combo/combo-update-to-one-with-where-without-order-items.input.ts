import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboWhereInput } from './combo-where.input';
import { Type } from 'class-transformer';
import { ComboUpdateWithoutOrder_itemsInput } from './combo-update-without-order-items.input';

@InputType()
export class ComboUpdateToOneWithWhereWithoutOrder_itemsInput {

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;

    @Field(() => ComboUpdateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => ComboUpdateWithoutOrder_itemsInput)
    data!: ComboUpdateWithoutOrder_itemsInput;
}

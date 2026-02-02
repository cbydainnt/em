import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';
import { Type } from 'class-transformer';
import { ComboCreateWithoutOrder_itemsInput } from './combo-create-without-order-items.input';

@InputType()
export class ComboCreateOrConnectWithoutOrder_itemsInput {

    @Field(() => ComboWhereUniqueInput, {nullable:false})
    @Type(() => ComboWhereUniqueInput)
    where!: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;

    @Field(() => ComboCreateWithoutOrder_itemsInput, {nullable:false})
    @Type(() => ComboCreateWithoutOrder_itemsInput)
    create!: ComboCreateWithoutOrder_itemsInput;
}

import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCreateWithoutOrder_itemsInput } from './combo-create-without-order-items.input';
import { Type } from 'class-transformer';
import { ComboCreateOrConnectWithoutOrder_itemsInput } from './combo-create-or-connect-without-order-items.input';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';

@InputType()
export class ComboCreateNestedOneWithoutOrder_itemsInput {

    @Field(() => ComboCreateWithoutOrder_itemsInput, {nullable:true})
    @Type(() => ComboCreateWithoutOrder_itemsInput)
    create?: ComboCreateWithoutOrder_itemsInput;

    @Field(() => ComboCreateOrConnectWithoutOrder_itemsInput, {nullable:true})
    @Type(() => ComboCreateOrConnectWithoutOrder_itemsInput)
    connectOrCreate?: ComboCreateOrConnectWithoutOrder_itemsInput;

    @Field(() => ComboWhereUniqueInput, {nullable:true})
    @Type(() => ComboWhereUniqueInput)
    connect?: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;
}

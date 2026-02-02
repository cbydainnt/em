import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ComboCreateWithoutOrder_itemsInput } from './combo-create-without-order-items.input';
import { Type } from 'class-transformer';
import { ComboCreateOrConnectWithoutOrder_itemsInput } from './combo-create-or-connect-without-order-items.input';
import { ComboUpsertWithoutOrder_itemsInput } from './combo-upsert-without-order-items.input';
import { ComboWhereInput } from './combo-where.input';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';
import { ComboUpdateToOneWithWhereWithoutOrder_itemsInput } from './combo-update-to-one-with-where-without-order-items.input';

@InputType()
export class ComboUpdateOneWithoutOrder_itemsNestedInput {

    @Field(() => ComboCreateWithoutOrder_itemsInput, {nullable:true})
    @Type(() => ComboCreateWithoutOrder_itemsInput)
    create?: ComboCreateWithoutOrder_itemsInput;

    @Field(() => ComboCreateOrConnectWithoutOrder_itemsInput, {nullable:true})
    @Type(() => ComboCreateOrConnectWithoutOrder_itemsInput)
    connectOrCreate?: ComboCreateOrConnectWithoutOrder_itemsInput;

    @Field(() => ComboUpsertWithoutOrder_itemsInput, {nullable:true})
    @Type(() => ComboUpsertWithoutOrder_itemsInput)
    upsert?: ComboUpsertWithoutOrder_itemsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    delete?: ComboWhereInput;

    @Field(() => ComboWhereUniqueInput, {nullable:true})
    @Type(() => ComboWhereUniqueInput)
    connect?: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;

    @Field(() => ComboUpdateToOneWithWhereWithoutOrder_itemsInput, {nullable:true})
    @Type(() => ComboUpdateToOneWithWhereWithoutOrder_itemsInput)
    update?: ComboUpdateToOneWithWhereWithoutOrder_itemsInput;
}

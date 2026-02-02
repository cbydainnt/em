import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ComboWhereInput } from './combo-where.input';
import { Type } from 'class-transformer';
import { ComboOrderByWithRelationInput } from './combo-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ComboWhereUniqueInput } from './combo-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ComboScalarFieldEnum } from './combo-scalar-field.enum';

@ArgsType()
export class FindManyComboArgs {

    @Field(() => ComboWhereInput, {nullable:true})
    @Type(() => ComboWhereInput)
    where?: ComboWhereInput;

    @Field(() => [ComboOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ComboOrderByWithRelationInput>;

    @Field(() => ComboWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ComboWhereUniqueInput, 'combo_id' | 'combo_name'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ComboScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ComboScalarFieldEnum>;
}

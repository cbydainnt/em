import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MSystemWhereInput } from './m-system-where.input';
import { Type } from 'class-transformer';
import { MSystemOrderByWithRelationInput } from './m-system-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { MSystemWhereUniqueInput } from './m-system-where-unique.input';
import { Int } from '@nestjs/graphql';
import { MSystemScalarFieldEnum } from './m-system-scalar-field.enum';

@ArgsType()
export class FindFirstMSystemOrThrowArgs {

    @Field(() => MSystemWhereInput, {nullable:true})
    @Type(() => MSystemWhereInput)
    where?: MSystemWhereInput;

    @Field(() => [MSystemOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<MSystemOrderByWithRelationInput>;

    @Field(() => MSystemWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<MSystemWhereUniqueInput, 'id' | 'param_key_param_no'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [MSystemScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof MSystemScalarFieldEnum>;
}

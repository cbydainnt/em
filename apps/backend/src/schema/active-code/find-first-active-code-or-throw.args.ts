import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ActiveCodeWhereInput } from './active-code-where.input';
import { Type } from 'class-transformer';
import { ActiveCodeOrderByWithRelationInput } from './active-code-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ActiveCodeWhereUniqueInput } from './active-code-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ActiveCodeScalarFieldEnum } from './active-code-scalar-field.enum';

@ArgsType()
export class FindFirstActiveCodeOrThrowArgs {

    @Field(() => ActiveCodeWhereInput, {nullable:true})
    @Type(() => ActiveCodeWhereInput)
    where?: ActiveCodeWhereInput;

    @Field(() => [ActiveCodeOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ActiveCodeOrderByWithRelationInput>;

    @Field(() => ActiveCodeWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ActiveCodeWhereUniqueInput, 'active_code_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ActiveCodeScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ActiveCodeScalarFieldEnum>;
}

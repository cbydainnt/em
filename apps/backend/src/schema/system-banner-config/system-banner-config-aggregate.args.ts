import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SystemBannerConfigWhereInput } from './system-banner-config-where.input';
import { Type } from 'class-transformer';
import { SystemBannerConfigOrderByWithRelationInput } from './system-banner-config-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { SystemBannerConfigWhereUniqueInput } from './system-banner-config-where-unique.input';
import { Int } from '@nestjs/graphql';
import { SystemBannerConfigCountAggregateInput } from './system-banner-config-count-aggregate.input';
import { SystemBannerConfigMinAggregateInput } from './system-banner-config-min-aggregate.input';
import { SystemBannerConfigMaxAggregateInput } from './system-banner-config-max-aggregate.input';

@ArgsType()
export class SystemBannerConfigAggregateArgs {

    @Field(() => SystemBannerConfigWhereInput, {nullable:true})
    @Type(() => SystemBannerConfigWhereInput)
    where?: SystemBannerConfigWhereInput;

    @Field(() => [SystemBannerConfigOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<SystemBannerConfigOrderByWithRelationInput>;

    @Field(() => SystemBannerConfigWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<SystemBannerConfigWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => SystemBannerConfigCountAggregateInput, {nullable:true})
    _count?: SystemBannerConfigCountAggregateInput;

    @Field(() => SystemBannerConfigMinAggregateInput, {nullable:true})
    _min?: SystemBannerConfigMinAggregateInput;

    @Field(() => SystemBannerConfigMaxAggregateInput, {nullable:true})
    _max?: SystemBannerConfigMaxAggregateInput;
}

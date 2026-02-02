import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SystemBannerConfigWhereInput } from './system-banner-config-where.input';
import { Type } from 'class-transformer';
import { SystemBannerConfigOrderByWithAggregationInput } from './system-banner-config-order-by-with-aggregation.input';
import { SystemBannerConfigScalarFieldEnum } from './system-banner-config-scalar-field.enum';
import { SystemBannerConfigScalarWhereWithAggregatesInput } from './system-banner-config-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { SystemBannerConfigCountAggregateInput } from './system-banner-config-count-aggregate.input';
import { SystemBannerConfigMinAggregateInput } from './system-banner-config-min-aggregate.input';
import { SystemBannerConfigMaxAggregateInput } from './system-banner-config-max-aggregate.input';

@ArgsType()
export class SystemBannerConfigGroupByArgs {

    @Field(() => SystemBannerConfigWhereInput, {nullable:true})
    @Type(() => SystemBannerConfigWhereInput)
    where?: SystemBannerConfigWhereInput;

    @Field(() => [SystemBannerConfigOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<SystemBannerConfigOrderByWithAggregationInput>;

    @Field(() => [SystemBannerConfigScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof SystemBannerConfigScalarFieldEnum>;

    @Field(() => SystemBannerConfigScalarWhereWithAggregatesInput, {nullable:true})
    having?: SystemBannerConfigScalarWhereWithAggregatesInput;

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

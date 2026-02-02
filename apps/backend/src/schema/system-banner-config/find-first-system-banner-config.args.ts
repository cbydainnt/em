import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SystemBannerConfigWhereInput } from './system-banner-config-where.input';
import { Type } from 'class-transformer';
import { SystemBannerConfigOrderByWithRelationInput } from './system-banner-config-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { SystemBannerConfigWhereUniqueInput } from './system-banner-config-where-unique.input';
import { Int } from '@nestjs/graphql';
import { SystemBannerConfigScalarFieldEnum } from './system-banner-config-scalar-field.enum';

@ArgsType()
export class FindFirstSystemBannerConfigArgs {

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

    @Field(() => [SystemBannerConfigScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof SystemBannerConfigScalarFieldEnum>;
}

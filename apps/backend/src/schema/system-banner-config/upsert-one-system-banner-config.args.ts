import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { SystemBannerConfigWhereUniqueInput } from './system-banner-config-where-unique.input';
import { Type } from 'class-transformer';
import { SystemBannerConfigCreateInput } from './system-banner-config-create.input';
import { SystemBannerConfigUpdateInput } from './system-banner-config-update.input';

@ArgsType()
export class UpsertOneSystemBannerConfigArgs {

    @Field(() => SystemBannerConfigWhereUniqueInput, {nullable:false})
    @Type(() => SystemBannerConfigWhereUniqueInput)
    where!: Prisma.AtLeast<SystemBannerConfigWhereUniqueInput, 'id'>;

    @Field(() => SystemBannerConfigCreateInput, {nullable:false})
    @Type(() => SystemBannerConfigCreateInput)
    create!: SystemBannerConfigCreateInput;

    @Field(() => SystemBannerConfigUpdateInput, {nullable:false})
    @Type(() => SystemBannerConfigUpdateInput)
    update!: SystemBannerConfigUpdateInput;
}

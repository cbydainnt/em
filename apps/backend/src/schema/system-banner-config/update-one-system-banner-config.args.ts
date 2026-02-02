import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SystemBannerConfigUpdateInput } from './system-banner-config-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { SystemBannerConfigWhereUniqueInput } from './system-banner-config-where-unique.input';

@ArgsType()
export class UpdateOneSystemBannerConfigArgs {

    @Field(() => SystemBannerConfigUpdateInput, {nullable:false})
    @Type(() => SystemBannerConfigUpdateInput)
    data!: SystemBannerConfigUpdateInput;

    @Field(() => SystemBannerConfigWhereUniqueInput, {nullable:false})
    @Type(() => SystemBannerConfigWhereUniqueInput)
    where!: Prisma.AtLeast<SystemBannerConfigWhereUniqueInput, 'id'>;
}

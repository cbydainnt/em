import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { SystemBannerConfigWhereUniqueInput } from './system-banner-config-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOneSystemBannerConfigArgs {

    @Field(() => SystemBannerConfigWhereUniqueInput, {nullable:false})
    @Type(() => SystemBannerConfigWhereUniqueInput)
    where!: Prisma.AtLeast<SystemBannerConfigWhereUniqueInput, 'id'>;
}

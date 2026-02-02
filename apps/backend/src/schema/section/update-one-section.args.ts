import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { SectionUpdateInput } from './section-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { SectionWhereUniqueInput } from './section-where-unique.input';

@ArgsType()
export class UpdateOneSectionArgs {

    @Field(() => SectionUpdateInput, {nullable:false})
    @Type(() => SectionUpdateInput)
    data!: SectionUpdateInput;

    @Field(() => SectionWhereUniqueInput, {nullable:false})
    @Type(() => SectionWhereUniqueInput)
    where!: Prisma.AtLeast<SectionWhereUniqueInput, 'section_id'>;
}

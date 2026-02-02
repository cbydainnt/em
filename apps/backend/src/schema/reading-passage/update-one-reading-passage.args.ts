import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReadingPassageUpdateInput } from './reading-passage-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ReadingPassageWhereUniqueInput } from './reading-passage-where-unique.input';

@ArgsType()
export class UpdateOneReadingPassageArgs {

    @Field(() => ReadingPassageUpdateInput, {nullable:false})
    @Type(() => ReadingPassageUpdateInput)
    data!: ReadingPassageUpdateInput;

    @Field(() => ReadingPassageWhereUniqueInput, {nullable:false})
    @Type(() => ReadingPassageWhereUniqueInput)
    where!: Prisma.AtLeast<ReadingPassageWhereUniqueInput, 'reading_passage_id'>;
}

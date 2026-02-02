import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReadingPassageWhereUniqueInput } from './reading-passage-where-unique.input';
import { Type } from 'class-transformer';
import { ReadingPassageCreateInput } from './reading-passage-create.input';
import { ReadingPassageUpdateInput } from './reading-passage-update.input';

@ArgsType()
export class UpsertOneReadingPassageArgs {

    @Field(() => ReadingPassageWhereUniqueInput, {nullable:false})
    @Type(() => ReadingPassageWhereUniqueInput)
    where!: Prisma.AtLeast<ReadingPassageWhereUniqueInput, 'reading_passage_id'>;

    @Field(() => ReadingPassageCreateInput, {nullable:false})
    @Type(() => ReadingPassageCreateInput)
    create!: ReadingPassageCreateInput;

    @Field(() => ReadingPassageUpdateInput, {nullable:false})
    @Type(() => ReadingPassageUpdateInput)
    update!: ReadingPassageUpdateInput;
}

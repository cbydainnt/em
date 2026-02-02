import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReadingPassageWhereUniqueInput } from './reading-passage-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueReadingPassageArgs {

    @Field(() => ReadingPassageWhereUniqueInput, {nullable:false})
    @Type(() => ReadingPassageWhereUniqueInput)
    where!: Prisma.AtLeast<ReadingPassageWhereUniqueInput, 'reading_passage_id'>;
}

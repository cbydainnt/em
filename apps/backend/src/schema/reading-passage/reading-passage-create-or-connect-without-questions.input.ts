import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ReadingPassageWhereUniqueInput } from './reading-passage-where-unique.input';
import { Type } from 'class-transformer';
import { ReadingPassageCreateWithoutQuestionsInput } from './reading-passage-create-without-questions.input';

@InputType()
export class ReadingPassageCreateOrConnectWithoutQuestionsInput {

    @Field(() => ReadingPassageWhereUniqueInput, {nullable:false})
    @Type(() => ReadingPassageWhereUniqueInput)
    where!: Prisma.AtLeast<ReadingPassageWhereUniqueInput, 'reading_passage_id'>;

    @Field(() => ReadingPassageCreateWithoutQuestionsInput, {nullable:false})
    @Type(() => ReadingPassageCreateWithoutQuestionsInput)
    create!: ReadingPassageCreateWithoutQuestionsInput;
}

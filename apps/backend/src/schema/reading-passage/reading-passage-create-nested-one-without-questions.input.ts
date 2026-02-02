import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReadingPassageCreateWithoutQuestionsInput } from './reading-passage-create-without-questions.input';
import { Type } from 'class-transformer';
import { ReadingPassageCreateOrConnectWithoutQuestionsInput } from './reading-passage-create-or-connect-without-questions.input';
import { Prisma } from '@prisma/client';
import { ReadingPassageWhereUniqueInput } from './reading-passage-where-unique.input';

@InputType()
export class ReadingPassageCreateNestedOneWithoutQuestionsInput {

    @Field(() => ReadingPassageCreateWithoutQuestionsInput, {nullable:true})
    @Type(() => ReadingPassageCreateWithoutQuestionsInput)
    create?: ReadingPassageCreateWithoutQuestionsInput;

    @Field(() => ReadingPassageCreateOrConnectWithoutQuestionsInput, {nullable:true})
    @Type(() => ReadingPassageCreateOrConnectWithoutQuestionsInput)
    connectOrCreate?: ReadingPassageCreateOrConnectWithoutQuestionsInput;

    @Field(() => ReadingPassageWhereUniqueInput, {nullable:true})
    @Type(() => ReadingPassageWhereUniqueInput)
    connect?: Prisma.AtLeast<ReadingPassageWhereUniqueInput, 'reading_passage_id'>;
}

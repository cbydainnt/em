import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReadingPassageCreateWithoutQuestionsInput } from './reading-passage-create-without-questions.input';
import { Type } from 'class-transformer';
import { ReadingPassageCreateOrConnectWithoutQuestionsInput } from './reading-passage-create-or-connect-without-questions.input';
import { ReadingPassageUpsertWithoutQuestionsInput } from './reading-passage-upsert-without-questions.input';
import { ReadingPassageWhereInput } from './reading-passage-where.input';
import { Prisma } from '@prisma/client';
import { ReadingPassageWhereUniqueInput } from './reading-passage-where-unique.input';
import { ReadingPassageUpdateToOneWithWhereWithoutQuestionsInput } from './reading-passage-update-to-one-with-where-without-questions.input';

@InputType()
export class ReadingPassageUpdateOneWithoutQuestionsNestedInput {

    @Field(() => ReadingPassageCreateWithoutQuestionsInput, {nullable:true})
    @Type(() => ReadingPassageCreateWithoutQuestionsInput)
    create?: ReadingPassageCreateWithoutQuestionsInput;

    @Field(() => ReadingPassageCreateOrConnectWithoutQuestionsInput, {nullable:true})
    @Type(() => ReadingPassageCreateOrConnectWithoutQuestionsInput)
    connectOrCreate?: ReadingPassageCreateOrConnectWithoutQuestionsInput;

    @Field(() => ReadingPassageUpsertWithoutQuestionsInput, {nullable:true})
    @Type(() => ReadingPassageUpsertWithoutQuestionsInput)
    upsert?: ReadingPassageUpsertWithoutQuestionsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => ReadingPassageWhereInput, {nullable:true})
    @Type(() => ReadingPassageWhereInput)
    delete?: ReadingPassageWhereInput;

    @Field(() => ReadingPassageWhereUniqueInput, {nullable:true})
    @Type(() => ReadingPassageWhereUniqueInput)
    connect?: Prisma.AtLeast<ReadingPassageWhereUniqueInput, 'reading_passage_id'>;

    @Field(() => ReadingPassageUpdateToOneWithWhereWithoutQuestionsInput, {nullable:true})
    @Type(() => ReadingPassageUpdateToOneWithWhereWithoutQuestionsInput)
    update?: ReadingPassageUpdateToOneWithWhereWithoutQuestionsInput;
}

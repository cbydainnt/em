import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReadingPassageUpdateWithoutQuestionsInput } from './reading-passage-update-without-questions.input';
import { Type } from 'class-transformer';
import { ReadingPassageCreateWithoutQuestionsInput } from './reading-passage-create-without-questions.input';
import { ReadingPassageWhereInput } from './reading-passage-where.input';

@InputType()
export class ReadingPassageUpsertWithoutQuestionsInput {

    @Field(() => ReadingPassageUpdateWithoutQuestionsInput, {nullable:false})
    @Type(() => ReadingPassageUpdateWithoutQuestionsInput)
    update!: ReadingPassageUpdateWithoutQuestionsInput;

    @Field(() => ReadingPassageCreateWithoutQuestionsInput, {nullable:false})
    @Type(() => ReadingPassageCreateWithoutQuestionsInput)
    create!: ReadingPassageCreateWithoutQuestionsInput;

    @Field(() => ReadingPassageWhereInput, {nullable:true})
    @Type(() => ReadingPassageWhereInput)
    where?: ReadingPassageWhereInput;
}

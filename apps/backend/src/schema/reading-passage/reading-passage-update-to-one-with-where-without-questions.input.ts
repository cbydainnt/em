import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReadingPassageWhereInput } from './reading-passage-where.input';
import { Type } from 'class-transformer';
import { ReadingPassageUpdateWithoutQuestionsInput } from './reading-passage-update-without-questions.input';

@InputType()
export class ReadingPassageUpdateToOneWithWhereWithoutQuestionsInput {

    @Field(() => ReadingPassageWhereInput, {nullable:true})
    @Type(() => ReadingPassageWhereInput)
    where?: ReadingPassageWhereInput;

    @Field(() => ReadingPassageUpdateWithoutQuestionsInput, {nullable:false})
    @Type(() => ReadingPassageUpdateWithoutQuestionsInput)
    data!: ReadingPassageUpdateWithoutQuestionsInput;
}

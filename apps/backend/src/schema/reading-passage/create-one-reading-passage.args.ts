import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReadingPassageCreateInput } from './reading-passage-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneReadingPassageArgs {

    @Field(() => ReadingPassageCreateInput, {nullable:false})
    @Type(() => ReadingPassageCreateInput)
    data!: ReadingPassageCreateInput;
}

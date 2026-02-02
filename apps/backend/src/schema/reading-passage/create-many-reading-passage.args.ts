import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReadingPassageCreateManyInput } from './reading-passage-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyReadingPassageArgs {

    @Field(() => [ReadingPassageCreateManyInput], {nullable:false})
    @Type(() => ReadingPassageCreateManyInput)
    data!: Array<ReadingPassageCreateManyInput>;
}

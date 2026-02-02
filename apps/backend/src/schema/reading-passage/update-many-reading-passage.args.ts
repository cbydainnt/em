import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReadingPassageUpdateManyMutationInput } from './reading-passage-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ReadingPassageWhereInput } from './reading-passage-where.input';

@ArgsType()
export class UpdateManyReadingPassageArgs {

    @Field(() => ReadingPassageUpdateManyMutationInput, {nullable:false})
    @Type(() => ReadingPassageUpdateManyMutationInput)
    data!: ReadingPassageUpdateManyMutationInput;

    @Field(() => ReadingPassageWhereInput, {nullable:true})
    @Type(() => ReadingPassageWhereInput)
    where?: ReadingPassageWhereInput;
}

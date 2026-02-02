import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ReadingPassageWhereInput } from './reading-passage-where.input';

@InputType()
export class ReadingPassageNullableRelationFilter {

    @Field(() => ReadingPassageWhereInput, {nullable:true})
    is?: ReadingPassageWhereInput;

    @Field(() => ReadingPassageWhereInput, {nullable:true})
    isNot?: ReadingPassageWhereInput;
}

import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ReadingPassageWhereInput } from './reading-passage-where.input';
import { Type } from 'class-transformer';
import { ReadingPassageOrderByWithRelationInput } from './reading-passage-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { ReadingPassageWhereUniqueInput } from './reading-passage-where-unique.input';
import { Int } from '@nestjs/graphql';
import { ReadingPassageScalarFieldEnum } from './reading-passage-scalar-field.enum';

@ArgsType()
export class FindManyReadingPassageArgs {

    @Field(() => ReadingPassageWhereInput, {nullable:true})
    @Type(() => ReadingPassageWhereInput)
    where?: ReadingPassageWhereInput;

    @Field(() => [ReadingPassageOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<ReadingPassageOrderByWithRelationInput>;

    @Field(() => ReadingPassageWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<ReadingPassageWhereUniqueInput, 'reading_passage_id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [ReadingPassageScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof ReadingPassageScalarFieldEnum>;
}

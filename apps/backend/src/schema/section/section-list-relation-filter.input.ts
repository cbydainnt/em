import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SectionWhereInput } from './section-where.input';

@InputType()
export class SectionListRelationFilter {

    @Field(() => SectionWhereInput, {nullable:true})
    every?: SectionWhereInput;

    @Field(() => SectionWhereInput, {nullable:true})
    some?: SectionWhereInput;

    @Field(() => SectionWhereInput, {nullable:true})
    none?: SectionWhereInput;
}

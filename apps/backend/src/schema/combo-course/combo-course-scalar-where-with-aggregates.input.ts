import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';

@InputType()
export class ComboCourseScalarWhereWithAggregatesInput {

    @Field(() => [ComboCourseScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<ComboCourseScalarWhereWithAggregatesInput>;

    @Field(() => [ComboCourseScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<ComboCourseScalarWhereWithAggregatesInput>;

    @Field(() => [ComboCourseScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<ComboCourseScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    combo_id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    course_id?: StringWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    del_flg?: BoolWithAggregatesFilter;
}

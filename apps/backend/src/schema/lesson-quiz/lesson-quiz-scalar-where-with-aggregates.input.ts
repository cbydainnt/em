import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class LessonQuizScalarWhereWithAggregatesInput {

    @Field(() => [LessonQuizScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<LessonQuizScalarWhereWithAggregatesInput>;

    @Field(() => [LessonQuizScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<LessonQuizScalarWhereWithAggregatesInput>;

    @Field(() => [LessonQuizScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<LessonQuizScalarWhereWithAggregatesInput>;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    lesson_id?: StringWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    quiz_id?: StringWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    order?: IntWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    created_at?: DateTimeWithAggregatesFilter;
}

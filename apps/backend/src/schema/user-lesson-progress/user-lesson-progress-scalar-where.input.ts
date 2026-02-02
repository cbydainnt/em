import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { JsonNullableFilter } from '../prisma/json-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class UserLessonProgressScalarWhereInput {

    @Field(() => [UserLessonProgressScalarWhereInput], {nullable:true})
    AND?: Array<UserLessonProgressScalarWhereInput>;

    @Field(() => [UserLessonProgressScalarWhereInput], {nullable:true})
    OR?: Array<UserLessonProgressScalarWhereInput>;

    @Field(() => [UserLessonProgressScalarWhereInput], {nullable:true})
    NOT?: Array<UserLessonProgressScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    course_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    lesson_id?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    watched_seconds?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    completed?: IntFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    last_accessed?: DateTimeNullableFilter;

    @Field(() => JsonNullableFilter, {nullable:true})
    segments?: JsonNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updated_at?: DateTimeFilter;
}

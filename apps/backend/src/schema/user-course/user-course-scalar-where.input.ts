import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';

@InputType()
export class UserCourseScalarWhereInput {

    @Field(() => [UserCourseScalarWhereInput], {nullable:true})
    AND?: Array<UserCourseScalarWhereInput>;

    @Field(() => [UserCourseScalarWhereInput], {nullable:true})
    OR?: Array<UserCourseScalarWhereInput>;

    @Field(() => [UserCourseScalarWhereInput], {nullable:true})
    NOT?: Array<UserCourseScalarWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    user_id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    course_id?: StringFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    enrolled_at?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    last_accessed?: DateTimeNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    status?: IntFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    expired_date?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    paused_at?: DateTimeNullableFilter;

    @Field(() => DateTimeNullableFilter, {nullable:true})
    pause_until?: DateTimeNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    total_paused_days?: IntFilter;

    @Field(() => IntFilter, {nullable:true})
    pause_count?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    created_at?: DateTimeFilter;

    @Field(() => BoolFilter, {nullable:true})
    del_flg?: BoolFilter;
}

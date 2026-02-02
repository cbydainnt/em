import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCourseUser_idCourse_idCompoundUniqueInput } from './user-course-user-id-course-id-compound-unique.input';
import { UserCourseWhereInput } from './user-course-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeNullableFilter } from '../prisma/date-time-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { CourseRelationFilter } from '../course/course-relation-filter.input';

@InputType()
export class UserCourseWhereUniqueInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => UserCourseUser_idCourse_idCompoundUniqueInput, {nullable:true})
    user_id_course_id?: UserCourseUser_idCourse_idCompoundUniqueInput;

    @Field(() => [UserCourseWhereInput], {nullable:true})
    AND?: Array<UserCourseWhereInput>;

    @Field(() => [UserCourseWhereInput], {nullable:true})
    OR?: Array<UserCourseWhereInput>;

    @Field(() => [UserCourseWhereInput], {nullable:true})
    NOT?: Array<UserCourseWhereInput>;

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

    @Field(() => UserRelationFilter, {nullable:true})
    user?: UserRelationFilter;

    @Field(() => CourseRelationFilter, {nullable:true})
    course?: CourseRelationFilter;
}

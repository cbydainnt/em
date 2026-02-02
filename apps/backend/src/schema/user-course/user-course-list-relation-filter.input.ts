import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCourseWhereInput } from './user-course-where.input';

@InputType()
export class UserCourseListRelationFilter {

    @Field(() => UserCourseWhereInput, {nullable:true})
    every?: UserCourseWhereInput;

    @Field(() => UserCourseWhereInput, {nullable:true})
    some?: UserCourseWhereInput;

    @Field(() => UserCourseWhereInput, {nullable:true})
    none?: UserCourseWhereInput;
}

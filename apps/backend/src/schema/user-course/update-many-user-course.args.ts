import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserCourseUpdateManyMutationInput } from './user-course-update-many-mutation.input';
import { Type } from 'class-transformer';
import { UserCourseWhereInput } from './user-course-where.input';

@ArgsType()
export class UpdateManyUserCourseArgs {

    @Field(() => UserCourseUpdateManyMutationInput, {nullable:false})
    @Type(() => UserCourseUpdateManyMutationInput)
    data!: UserCourseUpdateManyMutationInput;

    @Field(() => UserCourseWhereInput, {nullable:true})
    @Type(() => UserCourseWhereInput)
    where?: UserCourseWhereInput;
}

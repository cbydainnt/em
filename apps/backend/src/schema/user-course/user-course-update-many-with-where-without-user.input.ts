import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCourseScalarWhereInput } from './user-course-scalar-where.input';
import { Type } from 'class-transformer';
import { UserCourseUpdateManyMutationInput } from './user-course-update-many-mutation.input';

@InputType()
export class UserCourseUpdateManyWithWhereWithoutUserInput {

    @Field(() => UserCourseScalarWhereInput, {nullable:false})
    @Type(() => UserCourseScalarWhereInput)
    where!: UserCourseScalarWhereInput;

    @Field(() => UserCourseUpdateManyMutationInput, {nullable:false})
    @Type(() => UserCourseUpdateManyMutationInput)
    data!: UserCourseUpdateManyMutationInput;
}

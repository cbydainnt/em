import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserCourseCreateInput } from './user-course-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneUserCourseArgs {

    @Field(() => UserCourseCreateInput, {nullable:false})
    @Type(() => UserCourseCreateInput)
    data!: UserCourseCreateInput;
}

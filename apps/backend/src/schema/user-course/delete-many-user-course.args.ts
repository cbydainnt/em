import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { UserCourseWhereInput } from './user-course-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyUserCourseArgs {

    @Field(() => UserCourseWhereInput, {nullable:true})
    @Type(() => UserCourseWhereInput)
    where?: UserCourseWhereInput;
}

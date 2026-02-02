import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseWhereInput } from './course-where.input';
import { Type } from 'class-transformer';
import { CourseUpdateWithoutNotificationsInput } from './course-update-without-notifications.input';

@InputType()
export class CourseUpdateToOneWithWhereWithoutNotificationsInput {

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;

    @Field(() => CourseUpdateWithoutNotificationsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutNotificationsInput)
    data!: CourseUpdateWithoutNotificationsInput;
}

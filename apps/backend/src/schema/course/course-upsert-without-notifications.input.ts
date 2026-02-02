import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseUpdateWithoutNotificationsInput } from './course-update-without-notifications.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutNotificationsInput } from './course-create-without-notifications.input';
import { CourseWhereInput } from './course-where.input';

@InputType()
export class CourseUpsertWithoutNotificationsInput {

    @Field(() => CourseUpdateWithoutNotificationsInput, {nullable:false})
    @Type(() => CourseUpdateWithoutNotificationsInput)
    update!: CourseUpdateWithoutNotificationsInput;

    @Field(() => CourseCreateWithoutNotificationsInput, {nullable:false})
    @Type(() => CourseCreateWithoutNotificationsInput)
    create!: CourseCreateWithoutNotificationsInput;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    where?: CourseWhereInput;
}

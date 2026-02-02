import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutNotificationsInput } from './course-create-without-notifications.input';

@InputType()
export class CourseCreateOrConnectWithoutNotificationsInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutNotificationsInput, {nullable:false})
    @Type(() => CourseCreateWithoutNotificationsInput)
    create!: CourseCreateWithoutNotificationsInput;
}

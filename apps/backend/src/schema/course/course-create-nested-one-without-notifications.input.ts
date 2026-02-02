import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutNotificationsInput } from './course-create-without-notifications.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutNotificationsInput } from './course-create-or-connect-without-notifications.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutNotificationsInput {

    @Field(() => CourseCreateWithoutNotificationsInput, {nullable:true})
    @Type(() => CourseCreateWithoutNotificationsInput)
    create?: CourseCreateWithoutNotificationsInput;

    @Field(() => CourseCreateOrConnectWithoutNotificationsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutNotificationsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutNotificationsInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}

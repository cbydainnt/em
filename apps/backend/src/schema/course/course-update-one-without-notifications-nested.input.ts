import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutNotificationsInput } from './course-create-without-notifications.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutNotificationsInput } from './course-create-or-connect-without-notifications.input';
import { CourseUpsertWithoutNotificationsInput } from './course-upsert-without-notifications.input';
import { CourseWhereInput } from './course-where.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutNotificationsInput } from './course-update-to-one-with-where-without-notifications.input';

@InputType()
export class CourseUpdateOneWithoutNotificationsNestedInput {

    @Field(() => CourseCreateWithoutNotificationsInput, {nullable:true})
    @Type(() => CourseCreateWithoutNotificationsInput)
    create?: CourseCreateWithoutNotificationsInput;

    @Field(() => CourseCreateOrConnectWithoutNotificationsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutNotificationsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutNotificationsInput;

    @Field(() => CourseUpsertWithoutNotificationsInput, {nullable:true})
    @Type(() => CourseUpsertWithoutNotificationsInput)
    upsert?: CourseUpsertWithoutNotificationsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => CourseWhereInput, {nullable:true})
    @Type(() => CourseWhereInput)
    delete?: CourseWhereInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutNotificationsInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutNotificationsInput)
    update?: CourseUpdateToOneWithWhereWithoutNotificationsInput;
}

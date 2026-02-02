import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';
import { Type } from 'class-transformer';
import { NotificationCreateWithoutCourseInput } from './notification-create-without-course.input';

@InputType()
export class NotificationCreateOrConnectWithoutCourseInput {

    @Field(() => NotificationWhereUniqueInput, {nullable:false})
    @Type(() => NotificationWhereUniqueInput)
    where!: Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>;

    @Field(() => NotificationCreateWithoutCourseInput, {nullable:false})
    @Type(() => NotificationCreateWithoutCourseInput)
    create!: NotificationCreateWithoutCourseInput;
}

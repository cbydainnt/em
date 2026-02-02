import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';
import { Type } from 'class-transformer';
import { NotificationUpdateWithoutCourseInput } from './notification-update-without-course.input';
import { NotificationCreateWithoutCourseInput } from './notification-create-without-course.input';

@InputType()
export class NotificationUpsertWithWhereUniqueWithoutCourseInput {

    @Field(() => NotificationWhereUniqueInput, {nullable:false})
    @Type(() => NotificationWhereUniqueInput)
    where!: Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>;

    @Field(() => NotificationUpdateWithoutCourseInput, {nullable:false})
    @Type(() => NotificationUpdateWithoutCourseInput)
    update!: NotificationUpdateWithoutCourseInput;

    @Field(() => NotificationCreateWithoutCourseInput, {nullable:false})
    @Type(() => NotificationCreateWithoutCourseInput)
    create!: NotificationCreateWithoutCourseInput;
}

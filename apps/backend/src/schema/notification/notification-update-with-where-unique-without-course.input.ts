import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';
import { Type } from 'class-transformer';
import { NotificationUpdateWithoutCourseInput } from './notification-update-without-course.input';

@InputType()
export class NotificationUpdateWithWhereUniqueWithoutCourseInput {

    @Field(() => NotificationWhereUniqueInput, {nullable:false})
    @Type(() => NotificationWhereUniqueInput)
    where!: Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>;

    @Field(() => NotificationUpdateWithoutCourseInput, {nullable:false})
    @Type(() => NotificationUpdateWithoutCourseInput)
    data!: NotificationUpdateWithoutCourseInput;
}

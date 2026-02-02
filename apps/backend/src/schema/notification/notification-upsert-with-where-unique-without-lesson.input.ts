import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';
import { Type } from 'class-transformer';
import { NotificationUpdateWithoutLessonInput } from './notification-update-without-lesson.input';
import { NotificationCreateWithoutLessonInput } from './notification-create-without-lesson.input';

@InputType()
export class NotificationUpsertWithWhereUniqueWithoutLessonInput {

    @Field(() => NotificationWhereUniqueInput, {nullable:false})
    @Type(() => NotificationWhereUniqueInput)
    where!: Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>;

    @Field(() => NotificationUpdateWithoutLessonInput, {nullable:false})
    @Type(() => NotificationUpdateWithoutLessonInput)
    update!: NotificationUpdateWithoutLessonInput;

    @Field(() => NotificationCreateWithoutLessonInput, {nullable:false})
    @Type(() => NotificationCreateWithoutLessonInput)
    create!: NotificationCreateWithoutLessonInput;
}

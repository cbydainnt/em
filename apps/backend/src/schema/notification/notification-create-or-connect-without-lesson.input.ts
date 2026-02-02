import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';
import { Type } from 'class-transformer';
import { NotificationCreateWithoutLessonInput } from './notification-create-without-lesson.input';

@InputType()
export class NotificationCreateOrConnectWithoutLessonInput {

    @Field(() => NotificationWhereUniqueInput, {nullable:false})
    @Type(() => NotificationWhereUniqueInput)
    where!: Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>;

    @Field(() => NotificationCreateWithoutLessonInput, {nullable:false})
    @Type(() => NotificationCreateWithoutLessonInput)
    create!: NotificationCreateWithoutLessonInput;
}

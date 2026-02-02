import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NotificationCreateWithoutLessonInput } from './notification-create-without-lesson.input';
import { Type } from 'class-transformer';
import { NotificationCreateOrConnectWithoutLessonInput } from './notification-create-or-connect-without-lesson.input';
import { NotificationCreateManyLessonInputEnvelope } from './notification-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';

@InputType()
export class NotificationUncheckedCreateNestedManyWithoutLessonInput {

    @Field(() => [NotificationCreateWithoutLessonInput], {nullable:true})
    @Type(() => NotificationCreateWithoutLessonInput)
    create?: Array<NotificationCreateWithoutLessonInput>;

    @Field(() => [NotificationCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => NotificationCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<NotificationCreateOrConnectWithoutLessonInput>;

    @Field(() => NotificationCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => NotificationCreateManyLessonInputEnvelope)
    createMany?: NotificationCreateManyLessonInputEnvelope;

    @Field(() => [NotificationWhereUniqueInput], {nullable:true})
    @Type(() => NotificationWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>>;
}

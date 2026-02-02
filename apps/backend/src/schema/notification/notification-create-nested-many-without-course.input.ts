import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NotificationCreateWithoutCourseInput } from './notification-create-without-course.input';
import { Type } from 'class-transformer';
import { NotificationCreateOrConnectWithoutCourseInput } from './notification-create-or-connect-without-course.input';
import { NotificationCreateManyCourseInputEnvelope } from './notification-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';

@InputType()
export class NotificationCreateNestedManyWithoutCourseInput {

    @Field(() => [NotificationCreateWithoutCourseInput], {nullable:true})
    @Type(() => NotificationCreateWithoutCourseInput)
    create?: Array<NotificationCreateWithoutCourseInput>;

    @Field(() => [NotificationCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => NotificationCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<NotificationCreateOrConnectWithoutCourseInput>;

    @Field(() => NotificationCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => NotificationCreateManyCourseInputEnvelope)
    createMany?: NotificationCreateManyCourseInputEnvelope;

    @Field(() => [NotificationWhereUniqueInput], {nullable:true})
    @Type(() => NotificationWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>>;
}

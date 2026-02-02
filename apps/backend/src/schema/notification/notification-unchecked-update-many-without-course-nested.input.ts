import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NotificationCreateWithoutCourseInput } from './notification-create-without-course.input';
import { Type } from 'class-transformer';
import { NotificationCreateOrConnectWithoutCourseInput } from './notification-create-or-connect-without-course.input';
import { NotificationUpsertWithWhereUniqueWithoutCourseInput } from './notification-upsert-with-where-unique-without-course.input';
import { NotificationCreateManyCourseInputEnvelope } from './notification-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';
import { NotificationUpdateWithWhereUniqueWithoutCourseInput } from './notification-update-with-where-unique-without-course.input';
import { NotificationUpdateManyWithWhereWithoutCourseInput } from './notification-update-many-with-where-without-course.input';
import { NotificationScalarWhereInput } from './notification-scalar-where.input';

@InputType()
export class NotificationUncheckedUpdateManyWithoutCourseNestedInput {

    @Field(() => [NotificationCreateWithoutCourseInput], {nullable:true})
    @Type(() => NotificationCreateWithoutCourseInput)
    create?: Array<NotificationCreateWithoutCourseInput>;

    @Field(() => [NotificationCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => NotificationCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<NotificationCreateOrConnectWithoutCourseInput>;

    @Field(() => [NotificationUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => NotificationUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<NotificationUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => NotificationCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => NotificationCreateManyCourseInputEnvelope)
    createMany?: NotificationCreateManyCourseInputEnvelope;

    @Field(() => [NotificationWhereUniqueInput], {nullable:true})
    @Type(() => NotificationWhereUniqueInput)
    set?: Array<Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>>;

    @Field(() => [NotificationWhereUniqueInput], {nullable:true})
    @Type(() => NotificationWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>>;

    @Field(() => [NotificationWhereUniqueInput], {nullable:true})
    @Type(() => NotificationWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>>;

    @Field(() => [NotificationWhereUniqueInput], {nullable:true})
    @Type(() => NotificationWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<NotificationWhereUniqueInput, 'notification_id'>>;

    @Field(() => [NotificationUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => NotificationUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<NotificationUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [NotificationUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => NotificationUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<NotificationUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [NotificationScalarWhereInput], {nullable:true})
    @Type(() => NotificationScalarWhereInput)
    deleteMany?: Array<NotificationScalarWhereInput>;
}

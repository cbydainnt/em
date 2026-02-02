import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NotificationCreateWithoutLessonInput } from './notification-create-without-lesson.input';
import { Type } from 'class-transformer';
import { NotificationCreateOrConnectWithoutLessonInput } from './notification-create-or-connect-without-lesson.input';
import { NotificationUpsertWithWhereUniqueWithoutLessonInput } from './notification-upsert-with-where-unique-without-lesson.input';
import { NotificationCreateManyLessonInputEnvelope } from './notification-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { NotificationWhereUniqueInput } from './notification-where-unique.input';
import { NotificationUpdateWithWhereUniqueWithoutLessonInput } from './notification-update-with-where-unique-without-lesson.input';
import { NotificationUpdateManyWithWhereWithoutLessonInput } from './notification-update-many-with-where-without-lesson.input';
import { NotificationScalarWhereInput } from './notification-scalar-where.input';

@InputType()
export class NotificationUpdateManyWithoutLessonNestedInput {

    @Field(() => [NotificationCreateWithoutLessonInput], {nullable:true})
    @Type(() => NotificationCreateWithoutLessonInput)
    create?: Array<NotificationCreateWithoutLessonInput>;

    @Field(() => [NotificationCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => NotificationCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<NotificationCreateOrConnectWithoutLessonInput>;

    @Field(() => [NotificationUpsertWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => NotificationUpsertWithWhereUniqueWithoutLessonInput)
    upsert?: Array<NotificationUpsertWithWhereUniqueWithoutLessonInput>;

    @Field(() => NotificationCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => NotificationCreateManyLessonInputEnvelope)
    createMany?: NotificationCreateManyLessonInputEnvelope;

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

    @Field(() => [NotificationUpdateWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => NotificationUpdateWithWhereUniqueWithoutLessonInput)
    update?: Array<NotificationUpdateWithWhereUniqueWithoutLessonInput>;

    @Field(() => [NotificationUpdateManyWithWhereWithoutLessonInput], {nullable:true})
    @Type(() => NotificationUpdateManyWithWhereWithoutLessonInput)
    updateMany?: Array<NotificationUpdateManyWithWhereWithoutLessonInput>;

    @Field(() => [NotificationScalarWhereInput], {nullable:true})
    @Type(() => NotificationScalarWhereInput)
    deleteMany?: Array<NotificationScalarWhereInput>;
}

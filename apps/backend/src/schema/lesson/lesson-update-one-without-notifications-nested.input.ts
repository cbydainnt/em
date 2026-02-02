import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutNotificationsInput } from './lesson-create-without-notifications.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutNotificationsInput } from './lesson-create-or-connect-without-notifications.input';
import { LessonUpsertWithoutNotificationsInput } from './lesson-upsert-without-notifications.input';
import { LessonWhereInput } from './lesson-where.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { LessonUpdateToOneWithWhereWithoutNotificationsInput } from './lesson-update-to-one-with-where-without-notifications.input';

@InputType()
export class LessonUpdateOneWithoutNotificationsNestedInput {

    @Field(() => LessonCreateWithoutNotificationsInput, {nullable:true})
    @Type(() => LessonCreateWithoutNotificationsInput)
    create?: LessonCreateWithoutNotificationsInput;

    @Field(() => LessonCreateOrConnectWithoutNotificationsInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutNotificationsInput)
    connectOrCreate?: LessonCreateOrConnectWithoutNotificationsInput;

    @Field(() => LessonUpsertWithoutNotificationsInput, {nullable:true})
    @Type(() => LessonUpsertWithoutNotificationsInput)
    upsert?: LessonUpsertWithoutNotificationsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    delete?: LessonWhereInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonUpdateToOneWithWhereWithoutNotificationsInput, {nullable:true})
    @Type(() => LessonUpdateToOneWithWhereWithoutNotificationsInput)
    update?: LessonUpdateToOneWithWhereWithoutNotificationsInput;
}

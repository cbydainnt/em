import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutNotificationsInput } from './lesson-create-without-notifications.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutNotificationsInput } from './lesson-create-or-connect-without-notifications.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';

@InputType()
export class LessonCreateNestedOneWithoutNotificationsInput {

    @Field(() => LessonCreateWithoutNotificationsInput, {nullable:true})
    @Type(() => LessonCreateWithoutNotificationsInput)
    create?: LessonCreateWithoutNotificationsInput;

    @Field(() => LessonCreateOrConnectWithoutNotificationsInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutNotificationsInput)
    connectOrCreate?: LessonCreateOrConnectWithoutNotificationsInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;
}

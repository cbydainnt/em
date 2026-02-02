import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutNotificationsInput } from './lesson-create-without-notifications.input';

@InputType()
export class LessonCreateOrConnectWithoutNotificationsInput {

    @Field(() => LessonWhereUniqueInput, {nullable:false})
    @Type(() => LessonWhereUniqueInput)
    where!: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonCreateWithoutNotificationsInput, {nullable:false})
    @Type(() => LessonCreateWithoutNotificationsInput)
    create!: LessonCreateWithoutNotificationsInput;
}

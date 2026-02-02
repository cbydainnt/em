import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonUpdateWithoutNotificationsInput } from './lesson-update-without-notifications.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutNotificationsInput } from './lesson-create-without-notifications.input';
import { LessonWhereInput } from './lesson-where.input';

@InputType()
export class LessonUpsertWithoutNotificationsInput {

    @Field(() => LessonUpdateWithoutNotificationsInput, {nullable:false})
    @Type(() => LessonUpdateWithoutNotificationsInput)
    update!: LessonUpdateWithoutNotificationsInput;

    @Field(() => LessonCreateWithoutNotificationsInput, {nullable:false})
    @Type(() => LessonCreateWithoutNotificationsInput)
    create!: LessonCreateWithoutNotificationsInput;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;
}

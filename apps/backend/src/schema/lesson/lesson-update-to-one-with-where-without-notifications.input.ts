import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';
import { LessonUpdateWithoutNotificationsInput } from './lesson-update-without-notifications.input';

@InputType()
export class LessonUpdateToOneWithWhereWithoutNotificationsInput {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;

    @Field(() => LessonUpdateWithoutNotificationsInput, {nullable:false})
    @Type(() => LessonUpdateWithoutNotificationsInput)
    data!: LessonUpdateWithoutNotificationsInput;
}

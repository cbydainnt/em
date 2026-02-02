import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NotificationCreateManyLessonInput } from './notification-create-many-lesson.input';
import { Type } from 'class-transformer';

@InputType()
export class NotificationCreateManyLessonInputEnvelope {

    @Field(() => [NotificationCreateManyLessonInput], {nullable:false})
    @Type(() => NotificationCreateManyLessonInput)
    data!: Array<NotificationCreateManyLessonInput>;
}

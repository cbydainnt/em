import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NotificationCreateManyCourseInput } from './notification-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class NotificationCreateManyCourseInputEnvelope {

    @Field(() => [NotificationCreateManyCourseInput], {nullable:false})
    @Type(() => NotificationCreateManyCourseInput)
    data!: Array<NotificationCreateManyCourseInput>;
}

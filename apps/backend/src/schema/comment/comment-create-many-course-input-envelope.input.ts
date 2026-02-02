import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateManyCourseInput } from './comment-create-many-course.input';
import { Type } from 'class-transformer';

@InputType()
export class CommentCreateManyCourseInputEnvelope {

    @Field(() => [CommentCreateManyCourseInput], {nullable:false})
    @Type(() => CommentCreateManyCourseInput)
    data!: Array<CommentCreateManyCourseInput>;
}

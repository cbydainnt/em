import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateManyLessonInput } from './comment-create-many-lesson.input';
import { Type } from 'class-transformer';

@InputType()
export class CommentCreateManyLessonInputEnvelope {

    @Field(() => [CommentCreateManyLessonInput], {nullable:false})
    @Type(() => CommentCreateManyLessonInput)
    data!: Array<CommentCreateManyLessonInput>;
}

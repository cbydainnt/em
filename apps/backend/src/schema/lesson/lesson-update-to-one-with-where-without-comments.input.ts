import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonWhereInput } from './lesson-where.input';
import { Type } from 'class-transformer';
import { LessonUpdateWithoutCommentsInput } from './lesson-update-without-comments.input';

@InputType()
export class LessonUpdateToOneWithWhereWithoutCommentsInput {

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;

    @Field(() => LessonUpdateWithoutCommentsInput, {nullable:false})
    @Type(() => LessonUpdateWithoutCommentsInput)
    data!: LessonUpdateWithoutCommentsInput;
}

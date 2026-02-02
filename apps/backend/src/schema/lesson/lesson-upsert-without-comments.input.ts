import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonUpdateWithoutCommentsInput } from './lesson-update-without-comments.input';
import { Type } from 'class-transformer';
import { LessonCreateWithoutCommentsInput } from './lesson-create-without-comments.input';
import { LessonWhereInput } from './lesson-where.input';

@InputType()
export class LessonUpsertWithoutCommentsInput {

    @Field(() => LessonUpdateWithoutCommentsInput, {nullable:false})
    @Type(() => LessonUpdateWithoutCommentsInput)
    update!: LessonUpdateWithoutCommentsInput;

    @Field(() => LessonCreateWithoutCommentsInput, {nullable:false})
    @Type(() => LessonCreateWithoutCommentsInput)
    create!: LessonCreateWithoutCommentsInput;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    where?: LessonWhereInput;
}

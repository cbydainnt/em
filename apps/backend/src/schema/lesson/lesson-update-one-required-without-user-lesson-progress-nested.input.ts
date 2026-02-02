import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutUser_lesson_progressInput } from './lesson-create-without-user-lesson-progress.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutUser_lesson_progressInput } from './lesson-create-or-connect-without-user-lesson-progress.input';
import { LessonUpsertWithoutUser_lesson_progressInput } from './lesson-upsert-without-user-lesson-progress.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { LessonUpdateToOneWithWhereWithoutUser_lesson_progressInput } from './lesson-update-to-one-with-where-without-user-lesson-progress.input';

@InputType()
export class LessonUpdateOneRequiredWithoutUser_lesson_progressNestedInput {

    @Field(() => LessonCreateWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => LessonCreateWithoutUser_lesson_progressInput)
    create?: LessonCreateWithoutUser_lesson_progressInput;

    @Field(() => LessonCreateOrConnectWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutUser_lesson_progressInput)
    connectOrCreate?: LessonCreateOrConnectWithoutUser_lesson_progressInput;

    @Field(() => LessonUpsertWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => LessonUpsertWithoutUser_lesson_progressInput)
    upsert?: LessonUpsertWithoutUser_lesson_progressInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonUpdateToOneWithWhereWithoutUser_lesson_progressInput, {nullable:true})
    @Type(() => LessonUpdateToOneWithWhereWithoutUser_lesson_progressInput)
    update?: LessonUpdateToOneWithWhereWithoutUser_lesson_progressInput;
}

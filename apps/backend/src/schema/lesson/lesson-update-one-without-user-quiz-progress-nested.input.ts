import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutUser_quiz_progressInput } from './lesson-create-without-user-quiz-progress.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutUser_quiz_progressInput } from './lesson-create-or-connect-without-user-quiz-progress.input';
import { LessonUpsertWithoutUser_quiz_progressInput } from './lesson-upsert-without-user-quiz-progress.input';
import { LessonWhereInput } from './lesson-where.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { LessonUpdateToOneWithWhereWithoutUser_quiz_progressInput } from './lesson-update-to-one-with-where-without-user-quiz-progress.input';

@InputType()
export class LessonUpdateOneWithoutUser_quiz_progressNestedInput {

    @Field(() => LessonCreateWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => LessonCreateWithoutUser_quiz_progressInput)
    create?: LessonCreateWithoutUser_quiz_progressInput;

    @Field(() => LessonCreateOrConnectWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutUser_quiz_progressInput)
    connectOrCreate?: LessonCreateOrConnectWithoutUser_quiz_progressInput;

    @Field(() => LessonUpsertWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => LessonUpsertWithoutUser_quiz_progressInput)
    upsert?: LessonUpsertWithoutUser_quiz_progressInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    delete?: LessonWhereInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonUpdateToOneWithWhereWithoutUser_quiz_progressInput, {nullable:true})
    @Type(() => LessonUpdateToOneWithWhereWithoutUser_quiz_progressInput)
    update?: LessonUpdateToOneWithWhereWithoutUser_quiz_progressInput;
}

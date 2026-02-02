import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutCommentsInput } from './lesson-create-without-comments.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutCommentsInput } from './lesson-create-or-connect-without-comments.input';
import { LessonUpsertWithoutCommentsInput } from './lesson-upsert-without-comments.input';
import { LessonWhereInput } from './lesson-where.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';
import { LessonUpdateToOneWithWhereWithoutCommentsInput } from './lesson-update-to-one-with-where-without-comments.input';

@InputType()
export class LessonUpdateOneWithoutCommentsNestedInput {

    @Field(() => LessonCreateWithoutCommentsInput, {nullable:true})
    @Type(() => LessonCreateWithoutCommentsInput)
    create?: LessonCreateWithoutCommentsInput;

    @Field(() => LessonCreateOrConnectWithoutCommentsInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutCommentsInput)
    connectOrCreate?: LessonCreateOrConnectWithoutCommentsInput;

    @Field(() => LessonUpsertWithoutCommentsInput, {nullable:true})
    @Type(() => LessonUpsertWithoutCommentsInput)
    upsert?: LessonUpsertWithoutCommentsInput;

    @Field(() => Boolean, {nullable:true})
    disconnect?: boolean;

    @Field(() => LessonWhereInput, {nullable:true})
    @Type(() => LessonWhereInput)
    delete?: LessonWhereInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;

    @Field(() => LessonUpdateToOneWithWhereWithoutCommentsInput, {nullable:true})
    @Type(() => LessonUpdateToOneWithWhereWithoutCommentsInput)
    update?: LessonUpdateToOneWithWhereWithoutCommentsInput;
}

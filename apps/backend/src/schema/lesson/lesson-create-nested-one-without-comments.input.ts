import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { LessonCreateWithoutCommentsInput } from './lesson-create-without-comments.input';
import { Type } from 'class-transformer';
import { LessonCreateOrConnectWithoutCommentsInput } from './lesson-create-or-connect-without-comments.input';
import { Prisma } from '@prisma/client';
import { LessonWhereUniqueInput } from './lesson-where-unique.input';

@InputType()
export class LessonCreateNestedOneWithoutCommentsInput {

    @Field(() => LessonCreateWithoutCommentsInput, {nullable:true})
    @Type(() => LessonCreateWithoutCommentsInput)
    create?: LessonCreateWithoutCommentsInput;

    @Field(() => LessonCreateOrConnectWithoutCommentsInput, {nullable:true})
    @Type(() => LessonCreateOrConnectWithoutCommentsInput)
    connectOrCreate?: LessonCreateOrConnectWithoutCommentsInput;

    @Field(() => LessonWhereUniqueInput, {nullable:true})
    @Type(() => LessonWhereUniqueInput)
    connect?: Prisma.AtLeast<LessonWhereUniqueInput, 'lesson_id'>;
}

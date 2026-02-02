import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateWithoutLessonInput } from './comment-create-without-lesson.input';
import { Type } from 'class-transformer';
import { CommentCreateOrConnectWithoutLessonInput } from './comment-create-or-connect-without-lesson.input';
import { CommentCreateManyLessonInputEnvelope } from './comment-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';

@InputType()
export class CommentUncheckedCreateNestedManyWithoutLessonInput {

    @Field(() => [CommentCreateWithoutLessonInput], {nullable:true})
    @Type(() => CommentCreateWithoutLessonInput)
    create?: Array<CommentCreateWithoutLessonInput>;

    @Field(() => [CommentCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => CommentCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<CommentCreateOrConnectWithoutLessonInput>;

    @Field(() => CommentCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => CommentCreateManyLessonInputEnvelope)
    createMany?: CommentCreateManyLessonInputEnvelope;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>>;
}

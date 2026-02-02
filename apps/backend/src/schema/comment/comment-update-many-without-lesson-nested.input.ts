import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateWithoutLessonInput } from './comment-create-without-lesson.input';
import { Type } from 'class-transformer';
import { CommentCreateOrConnectWithoutLessonInput } from './comment-create-or-connect-without-lesson.input';
import { CommentUpsertWithWhereUniqueWithoutLessonInput } from './comment-upsert-with-where-unique-without-lesson.input';
import { CommentCreateManyLessonInputEnvelope } from './comment-create-many-lesson-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { CommentUpdateWithWhereUniqueWithoutLessonInput } from './comment-update-with-where-unique-without-lesson.input';
import { CommentUpdateManyWithWhereWithoutLessonInput } from './comment-update-many-with-where-without-lesson.input';
import { CommentScalarWhereInput } from './comment-scalar-where.input';

@InputType()
export class CommentUpdateManyWithoutLessonNestedInput {

    @Field(() => [CommentCreateWithoutLessonInput], {nullable:true})
    @Type(() => CommentCreateWithoutLessonInput)
    create?: Array<CommentCreateWithoutLessonInput>;

    @Field(() => [CommentCreateOrConnectWithoutLessonInput], {nullable:true})
    @Type(() => CommentCreateOrConnectWithoutLessonInput)
    connectOrCreate?: Array<CommentCreateOrConnectWithoutLessonInput>;

    @Field(() => [CommentUpsertWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => CommentUpsertWithWhereUniqueWithoutLessonInput)
    upsert?: Array<CommentUpsertWithWhereUniqueWithoutLessonInput>;

    @Field(() => CommentCreateManyLessonInputEnvelope, {nullable:true})
    @Type(() => CommentCreateManyLessonInputEnvelope)
    createMany?: CommentCreateManyLessonInputEnvelope;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>>;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>>;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>>;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>>;

    @Field(() => [CommentUpdateWithWhereUniqueWithoutLessonInput], {nullable:true})
    @Type(() => CommentUpdateWithWhereUniqueWithoutLessonInput)
    update?: Array<CommentUpdateWithWhereUniqueWithoutLessonInput>;

    @Field(() => [CommentUpdateManyWithWhereWithoutLessonInput], {nullable:true})
    @Type(() => CommentUpdateManyWithWhereWithoutLessonInput)
    updateMany?: Array<CommentUpdateManyWithWhereWithoutLessonInput>;

    @Field(() => [CommentScalarWhereInput], {nullable:true})
    @Type(() => CommentScalarWhereInput)
    deleteMany?: Array<CommentScalarWhereInput>;
}

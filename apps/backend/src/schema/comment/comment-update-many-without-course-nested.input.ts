import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateWithoutCourseInput } from './comment-create-without-course.input';
import { Type } from 'class-transformer';
import { CommentCreateOrConnectWithoutCourseInput } from './comment-create-or-connect-without-course.input';
import { CommentUpsertWithWhereUniqueWithoutCourseInput } from './comment-upsert-with-where-unique-without-course.input';
import { CommentCreateManyCourseInputEnvelope } from './comment-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { CommentUpdateWithWhereUniqueWithoutCourseInput } from './comment-update-with-where-unique-without-course.input';
import { CommentUpdateManyWithWhereWithoutCourseInput } from './comment-update-many-with-where-without-course.input';
import { CommentScalarWhereInput } from './comment-scalar-where.input';

@InputType()
export class CommentUpdateManyWithoutCourseNestedInput {

    @Field(() => [CommentCreateWithoutCourseInput], {nullable:true})
    @Type(() => CommentCreateWithoutCourseInput)
    create?: Array<CommentCreateWithoutCourseInput>;

    @Field(() => [CommentCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => CommentCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<CommentCreateOrConnectWithoutCourseInput>;

    @Field(() => [CommentUpsertWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => CommentUpsertWithWhereUniqueWithoutCourseInput)
    upsert?: Array<CommentUpsertWithWhereUniqueWithoutCourseInput>;

    @Field(() => CommentCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => CommentCreateManyCourseInputEnvelope)
    createMany?: CommentCreateManyCourseInputEnvelope;

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

    @Field(() => [CommentUpdateWithWhereUniqueWithoutCourseInput], {nullable:true})
    @Type(() => CommentUpdateWithWhereUniqueWithoutCourseInput)
    update?: Array<CommentUpdateWithWhereUniqueWithoutCourseInput>;

    @Field(() => [CommentUpdateManyWithWhereWithoutCourseInput], {nullable:true})
    @Type(() => CommentUpdateManyWithWhereWithoutCourseInput)
    updateMany?: Array<CommentUpdateManyWithWhereWithoutCourseInput>;

    @Field(() => [CommentScalarWhereInput], {nullable:true})
    @Type(() => CommentScalarWhereInput)
    deleteMany?: Array<CommentScalarWhereInput>;
}

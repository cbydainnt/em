import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentCreateWithoutCourseInput } from './comment-create-without-course.input';
import { Type } from 'class-transformer';
import { CommentCreateOrConnectWithoutCourseInput } from './comment-create-or-connect-without-course.input';
import { CommentCreateManyCourseInputEnvelope } from './comment-create-many-course-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';

@InputType()
export class CommentCreateNestedManyWithoutCourseInput {

    @Field(() => [CommentCreateWithoutCourseInput], {nullable:true})
    @Type(() => CommentCreateWithoutCourseInput)
    create?: Array<CommentCreateWithoutCourseInput>;

    @Field(() => [CommentCreateOrConnectWithoutCourseInput], {nullable:true})
    @Type(() => CommentCreateOrConnectWithoutCourseInput)
    connectOrCreate?: Array<CommentCreateOrConnectWithoutCourseInput>;

    @Field(() => CommentCreateManyCourseInputEnvelope, {nullable:true})
    @Type(() => CommentCreateManyCourseInputEnvelope)
    createMany?: CommentCreateManyCourseInputEnvelope;

    @Field(() => [CommentWhereUniqueInput], {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CommentWhereUniqueInput, 'comment_id' | 'seed_tag'>>;
}

import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseViewCreateWithoutUserInput } from './course-view-create-without-user.input';
import { Type } from 'class-transformer';
import { CourseViewCreateOrConnectWithoutUserInput } from './course-view-create-or-connect-without-user.input';
import { CourseViewCreateManyUserInputEnvelope } from './course-view-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CourseViewWhereUniqueInput } from './course-view-where-unique.input';

@InputType()
export class CourseViewUncheckedCreateNestedManyWithoutUserInput {

    @Field(() => [CourseViewCreateWithoutUserInput], {nullable:true})
    @Type(() => CourseViewCreateWithoutUserInput)
    create?: Array<CourseViewCreateWithoutUserInput>;

    @Field(() => [CourseViewCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => CourseViewCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<CourseViewCreateOrConnectWithoutUserInput>;

    @Field(() => CourseViewCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => CourseViewCreateManyUserInputEnvelope)
    createMany?: CourseViewCreateManyUserInputEnvelope;

    @Field(() => [CourseViewWhereUniqueInput], {nullable:true})
    @Type(() => CourseViewWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>>;
}

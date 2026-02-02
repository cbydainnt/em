import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseViewCreateWithoutUserInput } from './course-view-create-without-user.input';
import { Type } from 'class-transformer';
import { CourseViewCreateOrConnectWithoutUserInput } from './course-view-create-or-connect-without-user.input';
import { CourseViewUpsertWithWhereUniqueWithoutUserInput } from './course-view-upsert-with-where-unique-without-user.input';
import { CourseViewCreateManyUserInputEnvelope } from './course-view-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CourseViewWhereUniqueInput } from './course-view-where-unique.input';
import { CourseViewUpdateWithWhereUniqueWithoutUserInput } from './course-view-update-with-where-unique-without-user.input';
import { CourseViewUpdateManyWithWhereWithoutUserInput } from './course-view-update-many-with-where-without-user.input';
import { CourseViewScalarWhereInput } from './course-view-scalar-where.input';

@InputType()
export class CourseViewUpdateManyWithoutUserNestedInput {

    @Field(() => [CourseViewCreateWithoutUserInput], {nullable:true})
    @Type(() => CourseViewCreateWithoutUserInput)
    create?: Array<CourseViewCreateWithoutUserInput>;

    @Field(() => [CourseViewCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => CourseViewCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<CourseViewCreateOrConnectWithoutUserInput>;

    @Field(() => [CourseViewUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => CourseViewUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<CourseViewUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => CourseViewCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => CourseViewCreateManyUserInputEnvelope)
    createMany?: CourseViewCreateManyUserInputEnvelope;

    @Field(() => [CourseViewWhereUniqueInput], {nullable:true})
    @Type(() => CourseViewWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>>;

    @Field(() => [CourseViewWhereUniqueInput], {nullable:true})
    @Type(() => CourseViewWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>>;

    @Field(() => [CourseViewWhereUniqueInput], {nullable:true})
    @Type(() => CourseViewWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>>;

    @Field(() => [CourseViewWhereUniqueInput], {nullable:true})
    @Type(() => CourseViewWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CourseViewWhereUniqueInput, 'id'>>;

    @Field(() => [CourseViewUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => CourseViewUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<CourseViewUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [CourseViewUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => CourseViewUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<CourseViewUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [CourseViewScalarWhereInput], {nullable:true})
    @Type(() => CourseViewScalarWhereInput)
    deleteMany?: Array<CourseViewScalarWhereInput>;
}

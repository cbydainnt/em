import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutSectionsInput } from './course-create-without-sections.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutSectionsInput } from './course-create-or-connect-without-sections.input';
import { CourseUpsertWithoutSectionsInput } from './course-upsert-without-sections.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { CourseUpdateToOneWithWhereWithoutSectionsInput } from './course-update-to-one-with-where-without-sections.input';

@InputType()
export class CourseUpdateOneRequiredWithoutSectionsNestedInput {

    @Field(() => CourseCreateWithoutSectionsInput, {nullable:true})
    @Type(() => CourseCreateWithoutSectionsInput)
    create?: CourseCreateWithoutSectionsInput;

    @Field(() => CourseCreateOrConnectWithoutSectionsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutSectionsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutSectionsInput;

    @Field(() => CourseUpsertWithoutSectionsInput, {nullable:true})
    @Type(() => CourseUpsertWithoutSectionsInput)
    upsert?: CourseUpsertWithoutSectionsInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseUpdateToOneWithWhereWithoutSectionsInput, {nullable:true})
    @Type(() => CourseUpdateToOneWithWhereWithoutSectionsInput)
    update?: CourseUpdateToOneWithWhereWithoutSectionsInput;
}

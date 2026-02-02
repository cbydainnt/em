import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CourseCreateWithoutSectionsInput } from './course-create-without-sections.input';
import { Type } from 'class-transformer';
import { CourseCreateOrConnectWithoutSectionsInput } from './course-create-or-connect-without-sections.input';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';

@InputType()
export class CourseCreateNestedOneWithoutSectionsInput {

    @Field(() => CourseCreateWithoutSectionsInput, {nullable:true})
    @Type(() => CourseCreateWithoutSectionsInput)
    create?: CourseCreateWithoutSectionsInput;

    @Field(() => CourseCreateOrConnectWithoutSectionsInput, {nullable:true})
    @Type(() => CourseCreateOrConnectWithoutSectionsInput)
    connectOrCreate?: CourseCreateOrConnectWithoutSectionsInput;

    @Field(() => CourseWhereUniqueInput, {nullable:true})
    @Type(() => CourseWhereUniqueInput)
    connect?: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;
}

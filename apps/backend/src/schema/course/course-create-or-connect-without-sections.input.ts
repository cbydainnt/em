import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CourseWhereUniqueInput } from './course-where-unique.input';
import { Type } from 'class-transformer';
import { CourseCreateWithoutSectionsInput } from './course-create-without-sections.input';

@InputType()
export class CourseCreateOrConnectWithoutSectionsInput {

    @Field(() => CourseWhereUniqueInput, {nullable:false})
    @Type(() => CourseWhereUniqueInput)
    where!: Prisma.AtLeast<CourseWhereUniqueInput, 'course_id' | 'course_name'>;

    @Field(() => CourseCreateWithoutSectionsInput, {nullable:false})
    @Type(() => CourseCreateWithoutSectionsInput)
    create!: CourseCreateWithoutSectionsInput;
}

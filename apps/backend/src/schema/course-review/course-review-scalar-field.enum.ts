import { registerEnumType } from '@nestjs/graphql';

export enum CourseReviewScalarFieldEnum {
    id = "id",
    course_id = "course_id",
    user_id = "user_id",
    rating = "rating",
    comment = "comment",
    created_at = "created_at",
    updated_at = "updated_at"
}


registerEnumType(CourseReviewScalarFieldEnum, { name: 'CourseReviewScalarFieldEnum', description: undefined })

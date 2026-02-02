import { registerEnumType } from '@nestjs/graphql';

export enum RatingSummaryScalarFieldEnum {
    id = "id",
    course_id = "course_id",
    avg_rating = "avg_rating",
    total_reviews = "total_reviews",
    rating_1_count = "rating_1_count",
    rating_2_count = "rating_2_count",
    rating_3_count = "rating_3_count",
    rating_4_count = "rating_4_count",
    rating_5_count = "rating_5_count",
    updated_at = "updated_at"
}


registerEnumType(RatingSummaryScalarFieldEnum, { name: 'RatingSummaryScalarFieldEnum', description: undefined })

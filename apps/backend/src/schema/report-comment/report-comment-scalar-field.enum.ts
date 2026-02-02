import { registerEnumType } from '@nestjs/graphql';

export enum ReportCommentScalarFieldEnum {
    comment_id = "comment_id",
    report_id = "report_id",
    user_id = "user_id",
    content = "content",
    created_at = "created_at"
}


registerEnumType(ReportCommentScalarFieldEnum, { name: 'ReportCommentScalarFieldEnum', description: undefined })

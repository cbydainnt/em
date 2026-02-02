import { registerEnumType } from '@nestjs/graphql';

export enum DocumentScalarFieldEnum {
    document_id = "document_id",
    document_url = "document_url",
    extension = "extension",
    document_name = "document_name",
    size = "size",
    isDownloadable = "isDownloadable",
    created_at = "created_at",
    updated_at = "updated_at",
    lesson_id = "lesson_id"
}


registerEnumType(DocumentScalarFieldEnum, { name: 'DocumentScalarFieldEnum', description: undefined })

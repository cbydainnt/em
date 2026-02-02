import { registerEnumType } from '@nestjs/graphql';

export enum ComboCourseScalarFieldEnum {
    id = "id",
    combo_id = "combo_id",
    course_id = "course_id",
    del_flg = "del_flg"
}


registerEnumType(ComboCourseScalarFieldEnum, { name: 'ComboCourseScalarFieldEnum', description: undefined })

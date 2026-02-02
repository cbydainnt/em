import { registerEnumType } from '@nestjs/graphql';

export enum SystemBannerConfigScalarFieldEnum {
    id = "id",
    title_segments = "title_segments",
    description_config = "description_config",
    background_css = "background_css",
    main_image_src = "main_image_src",
    main_floating_image_config = "main_floating_image_config",
    main_floating_image_src = "main_floating_image_src",
    title_decor_image_src = "title_decor_image_src",
    button_decor_image_src = "button_decor_image_src",
    show_action_button = "show_action_button",
    action_button_text = "action_button_text",
    action_button_link = "action_button_link",
    is_default = "is_default",
    is_active = "is_active",
    created_at = "created_at",
    updated_at = "updated_at",
    updated_by = "updated_by"
}


registerEnumType(SystemBannerConfigScalarFieldEnum, { name: 'SystemBannerConfigScalarFieldEnum', description: undefined })

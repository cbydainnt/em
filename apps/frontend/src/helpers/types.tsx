export type TitleSegment = {
  id: string;
  text: string;
  color?: string;
  font_size?: number;
  font_weight?: number;
  font_family?: string;
};

export type DescriptionConfig = {
  text: string;
  color?: string;
  font_size?: number;
  font_family?: string;
};

export type FloatingImageConfig = {
  src?: string;
  visible?: boolean;
  size?: number;
  animation_type?: 'bounce' | 'float' | 'horizontal';
};

export type BannerConfig = {
  title_segments?: TitleSegment[];
  description_config?: DescriptionConfig;
  main_floating_image_config?: FloatingImageConfig;

  background_css: string;
  title: string;

  show_action_button: boolean;
  action_button_text?: string;
  action_button_link?: string;

  main_image_src?: string;
  main_floating_image_src?: string;
  title_decor_image_src?: string;
  button_decor_image_src?: string;

  main_image_file?: File;
  main_floating_image_file?: File;
  title_decor_image_file?: File;
  button_decor_image_file?: File;
};

export type EventTheme = 'default' | 'christmas' | 'new-year' | 'holiday-30-4' | 'holiday-2-9' | 'summer' | 'rainy';

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Switch, Box, Typography, Divider, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { BannerImageType } from '@/utils/enums';
import type { TitleSegment, DescriptionConfig, BannerConfig } from '@/helpers/types';
import { getAnimationTransition, getAnimationVariant } from '@/helpers/animation';
type SegmentEditorProps = {
  segment: TitleSegment;
  index: number;
  onChange: (index: number, patch: Partial<TitleSegment>) => void;
};

type EditBannerDialogProps = {
  open: boolean;
  initialData: BannerConfig | null;
  onClose: () => void;
  onSubmit: (data: BannerConfig, isReset: boolean) => void;
};

const FONT_FAMILIES = [
  { value: 'Arial, sans-serif', label: 'Arial' },
  { value: 'Helvetica, sans-serif', label: 'Helvetica' },
  { value: 'Times New Roman, serif', label: 'Times New Roman' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'Verdana, sans-serif', label: 'Verdana' },
  { value: 'Courier New, monospace', label: 'Courier New' },
  { value: 'Comic Sans MS, cursive', label: 'Comic Sans MS' },
  { value: 'Impact, sans-serif', label: 'Impact' },
  { value: 'Trebuchet MS, sans-serif', label: 'Trebuchet MS' },
  { value: 'Palatino, serif', label: 'Palatino' },
  { value: 'Spartan, cursive', label: 'Spartan' },
  { value: 'Roboto, sans-serif', label: 'Roboto' },
  { value: 'Open Sans, sans-serif', label: 'Open Sans' },
  { value: 'Lato, sans-serif', label: 'Lato' },
  { value: 'Montserrat, sans-serif', label: 'Montserrat' },
  { value: 'Poppins, sans-serif', label: 'Poppins' },
];

const SegmentEditor = React.memo(({ segment, index, onChange }: SegmentEditorProps) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 3,
        bgcolor: '#fff',
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        border: '1px solid #eee',
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography fontWeight={600} flex={1}>
          Tiêu đề {index + 1}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Text Input */}
      <TextField
        label="Nội dung tiêu đề"
        fullWidth
        value={segment.text}
        onChange={(e) => onChange(index, { text: e.target.value })}
        sx={{
          mb: 2,
          '& .MuiInputBase-root': {
            fontSize: 16,
            fontWeight: 500,
          },
          '& .MuiInputBase-input': {
            padding: '10px 14px',
          },
        }}
      />

      {/* Settings */}
      <Typography variant="caption" fontWeight={700} color="text.secondary" mb={1}>
        Cấu hình hiển thị
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 3,
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {/* Color */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={600} mb={0.5}>
            Màu chữ
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              px: 1,
              height: 40,
            }}
          >
            <input
              type="color"
              value={segment.color || '#ffffff'}
              onChange={(e) => onChange(index, { color: e.target.value })}
              style={{
                width: 32,
                height: 32,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
              }}
            />
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              {segment.color || '#ffffff'}
            </Typography>
          </Box>
        </Box>

        {/* Font Family */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={600} mb={0.5}>
            Kiểu chữ
          </Typography>
          <TextField select size="small" fullWidth value={segment.font_family || 'Spartan, cursive'} onChange={(e) => onChange(index, { font_family: e.target.value })} SelectProps={{ native: true }}>
            {FONT_FAMILIES.map((font) => (
              <option key={font.value} value={font.value} style={{ fontFamily: font.value, fontSize: 14 }}>
                {font.label}
              </option>
            ))}
          </TextField>
        </Box>

        {/* Font Size */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" fontWeight={600} mb={0.5}>
            Kích cỡ
          </Typography>
          <TextField
            type="number"
            size="small"
            fullWidth
            value={segment.font_size ?? ''}
            onChange={(e) => {
              const val = e.target.value;
              if (val === '') {
                onChange(index, { font_size: undefined });
              } else {
                const num = parseInt(val);
                if (!isNaN(num)) {
                  onChange(index, { font_size: num });
                }
              }
            }}
            inputProps={{ min: 8, max: 200 }}
          />
        </Box>
      </Box>

      {/* Preview */}
      <Box
        sx={{
          p: 3,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #3a3a3a 0%, #1f1f1f 100%)',
          textAlign: 'center',
          transition: 'all 0.15s ease',
        }}
      >
        <Typography
          sx={{
            color: segment.color || '#ffffff',
            fontSize: `${segment.font_size || 46}px`,
            fontFamily: segment.font_family || 'Spartan, cursive',
            fontWeight: segment.font_weight || 700,
            textShadow: '0 4px 12px rgba(0,0,0,0.4)',
            lineHeight: 1.2,
          }}
        >
          {segment.text || 'Sample Text'}
        </Typography>
      </Box>
    </Box>
  );
});

const EditBannerDialog = ({ open, initialData, onClose, onSubmit }: EditBannerDialogProps) => {
  const [localData, setLocalData] = useState<BannerConfig | null>(initialData);
  const [titleSegments, setTitleSegments] = useState<TitleSegment[]>([]);

  useEffect(() => {
    if (!initialData) return;

    setLocalData({
      ...initialData,
      main_floating_image_config: typeof initialData.main_floating_image_config === 'string' ? JSON.parse(initialData.main_floating_image_config) : initialData.main_floating_image_config,
    });

    setTitleSegments(
      initialData.title_segments && initialData.title_segments.length > 0
        ? initialData.title_segments
        : [
            {
              id: crypto.randomUUID(),
              text: initialData.title ?? '',
              color: '#ffffff',
              font_size: 46,
              font_weight: 700,
              font_family: 'Spartan, cursive',
            },
          ],
    );
  }, [initialData]);

  const updateTitleSegment = useCallback((index: number, patch: Partial<TitleSegment>) => {
    setTitleSegments((prev) => prev.map((seg, i) => (i === index ? { ...seg, ...patch } : seg)));
  }, []);

  const update = useCallback((patch: Partial<BannerConfig>) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      return { ...prev, ...patch };
    });
  }, []);

  const uploadImage = async (file: File, imageType: BannerImageType) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('imageType', String(imageType));

      const res = await axios.post('/api/admin/banner/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return res.data.image_url;
    } catch (error) {
      console.error(`Upload failed`, error);
      throw error;
    }
  };

  const handleUpdate = useCallback(
    async (data: BannerConfig, isReset: boolean) => {
      let updatedData: BannerConfig = {
        ...data,
        title_segments: titleSegments,
      };

      if (isReset) {
        updatedData = {
          ...updatedData,
          main_image_file: undefined,
          main_floating_image_file: undefined,
          title_decor_image_file: undefined,
          button_decor_image_file: undefined,
        };
      }

      if (!isReset) {
        try {
          if (updatedData.main_image_file) {
            updatedData.main_image_src = await uploadImage(updatedData.main_image_file, BannerImageType.Main);
            updatedData.main_image_file = undefined;
          }

          if (updatedData.main_floating_image_file) {
            const main_floating_image_src = await uploadImage(updatedData.main_floating_image_file, BannerImageType.Floating);
            updatedData.main_floating_image_config = {
              ...(updatedData.main_floating_image_config ?? {}),
              src: main_floating_image_src,
            };
            // update({ main_floating_image_config: { ...updatedData?.main_floating_image_config, src: main_floating_image_src } });
            updatedData.main_floating_image_file = undefined;
          }

          if (updatedData.title_decor_image_file) {
            updatedData.title_decor_image_src = await uploadImage(updatedData.title_decor_image_file, BannerImageType.TitleDecor);
            updatedData.title_decor_image_file = undefined;
          }

          if (updatedData.button_decor_image_file) {
            updatedData.button_decor_image_src = await uploadImage(updatedData.button_decor_image_file, BannerImageType.ButtonDecor);
            updatedData.button_decor_image_file = undefined;
          }
        } catch (error) {
          return;
        }
      }

      onSubmit(updatedData, isReset);
    },
    [titleSegments, onSubmit],
  );

  if (!localData) return null;

  const getImageSrc = (file?: File, src?: string) => {
    if (file) return URL.createObjectURL(file);
    if (src) return 'api/file/view/' + src;
    return undefined;
  };

  const imageSrc = getImageSrc(localData.main_image_file, localData.main_image_src);
  const floatingImage1Src = getImageSrc(localData.main_floating_image_file, localData.main_floating_image_src);
  const floatingImage2Src = getImageSrc(localData.button_decor_image_file, localData.button_decor_image_src);
  const staticImage1Src = getImageSrc(localData.title_decor_image_file, localData.title_decor_image_src);

  return (
    <Dialog
      open={open}
      onClose={(reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
        onClose();
      }}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          width: { xs: '95%', sm: '90%', md: '85%', lg: '900px', xl: '1000px' },
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ color: 'rgb(156, 39, 176)', fontSize: 26, fontWeight: 700 }}>Chỉnh sửa Banner</DialogTitle>

      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ maxWidth: 360 }}>
          <Typography fontWeight={600} mb={0.5}>
            Màu nền
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {/* Hex input */}
            <TextField
              size="small"
              fullWidth
              value={localData.background_css}
              onChange={(e) => update({ background_css: e.target.value })}
              placeholder="#ffffff"
              inputProps={{
                style: { fontFamily: 'monospace' },
              }}
            />

            {/* Color picker */}
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                border: '1px solid #d1d5db',
                overflow: 'hidden',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <input
                type="color"
                value={localData.background_css}
                onChange={(e) => update({ background_css: e.target.value })}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Title Segments */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {titleSegments.map((seg, idx) => (
            <SegmentEditor key={seg.id} segment={seg} index={idx} onChange={updateTitleSegment} />
          ))}
        </Box>

        {/* Description */}
        <Box sx={{ border: '1px solid #e5e7eb', borderRadius: 2, p: 2 }}>
          <Typography fontWeight={600} mb={1}>
            Description
          </Typography>

          {/* Text */}
          <TextField
            label="Description Text"
            multiline
            rows={3}
            fullWidth
            value={localData.description_config?.text ?? ''}
            onChange={(e) =>
              update({
                description_config: {
                  ...localData.description_config,
                  text: e.target.value,
                } as DescriptionConfig,
              })
            }
            sx={{
              mb: 3,
              '& .MuiInputBase-root': {
                fontSize: 15,
                fontWeight: 500,
              },
              '& .MuiInputBase-input': {
                padding: '10px 14px',
              },
            }}
          />

          {/* Color + Font Size */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              mb: 3,
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            {/* Color */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={700} mb={0.5}>
                Màu chữ
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    px: 1,
                    height: 40,
                    width: '100%',
                  }}
                >
                  <input
                    type="color"
                    value={localData.description_config?.color || '#ffffff'}
                    onChange={(e) =>
                      update({
                        description_config: {
                          ...localData.description_config,
                          text: localData.description_config?.text || '',
                          color: e.target.value,
                        },
                      })
                    }
                    style={{
                      width: '32px',
                      height: '32px',
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                    }}
                  />
                  <TextField
                    variant="standard"
                    size="small"
                    InputProps={{ disableUnderline: true }}
                    value={localData.description_config?.color || '#ffffff'}
                    onChange={(e) =>
                      update({
                        description_config: {
                          ...localData.description_config,
                          text: localData.description_config?.text || '',
                          color: e.target.value,
                        },
                      })
                    }
                    inputProps={{ style: { fontFamily: 'monospace' } }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Font Family */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={700} mb={0.5}>
                Kiểu chữ
              </Typography>

              <TextField
                select
                size="small"
                fullWidth
                value={localData.description_config?.font_family || 'Arial, sans-serif'}
                onChange={(e) =>
                  update({
                    description_config: {
                      ...localData.description_config,
                      text: localData.description_config?.text || '',
                      font_family: e.target.value,
                    },
                  })
                }
                SelectProps={{ native: true }}
              >
                {FONT_FAMILIES.map((font) => (
                  <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                    {font.label}
                  </option>
                ))}
              </TextField>
            </Box>

            {/* Font Size */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" fontWeight={700} mb={0.5}>
                Kích cỡ
              </Typography>

              <TextField
                type="number"
                size="small"
                fullWidth
                value={localData.description_config?.font_size ?? ''}
                onChange={(e) => {
                  const val = e.target.value;
                  update({
                    description_config: {
                      ...localData.description_config,
                      text: localData.description_config?.text || '',
                      font_size: val === '' ? undefined : parseInt(val),
                    },
                  });
                }}
                inputProps={{ min: 8, max: 100 }}
              />
            </Box>
          </Box>

          {/* Preview */}
          <Box
            sx={{
              p: 2,
              borderRadius: 1.5,
              background: 'linear-gradient(135deg, #3a3a3a 0%, #1f1f1f 100%)',
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{
                color: localData.description_config?.color || '#ffffff',
                fontSize: `${localData.description_config?.font_size || 18}px`,
                fontFamily: localData.description_config?.font_family || 'Arial, sans-serif',
                textShadow: '0 1px 2px rgba(0,0,0,0.25)',
              }}
            >
              {localData.description_config?.text || 'Sample description text'}
            </Typography>
          </Box>
        </Box>

        {/* Main Image */}
        <Box>
          <Typography fontWeight={600} mb={0.5}>
            Ảnh chính
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: 2,
            }}
          >
            {/* Preview ảnh lớn */}
            <Box
              sx={{
                flex: 1,
                width: { xs: '100%', md: '70%' },
                height: { xs: 200, sm: 300, md: 400 },
                border: '1px dashed #ccc',
                borderRadius: 1,
                overflow: 'hidden',
                backgroundColor: '#fafafa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {imageSrc ? <img src={imageSrc} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Preview" /> : <Typography variant="caption">No image</Typography>}
            </Box>

            {/* Column nhỏ cho thông báo + button */}
            <Box
              sx={{
                width: { xs: '100%', md: '30%' },
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Lưu ý: Tách nền trước khi thay đổi ảnh để phù hợp với banner. Có thể dùng các công cụ miễn phí:{' '}
                <a href="https://www.remove.bg/" target="_blank" rel="noopener noreferrer" style={{ color: 'red', textDecoration: 'underline' }}>
                  remove.bg
                </a>
                ,{' '}
                <a href="https://www.slazzer.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'red', textDecoration: 'underline' }}>
                  slazzer.com
                </a>
              </Typography>

              <Button variant="outlined" component="label">
                Chọn ảnh
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    update({ main_image_file: file });
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Floating Image 1 */}
        <Box>
          <Typography fontWeight={600} mb={0.5}>
            Ảnh động 1
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                flex: 1,
                width: { xs: '100%', md: '70%' },
                height: { xs: 150, sm: 200, md: 250 },
                border: '1px dashed #ccc',
                borderRadius: 1,
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* {floatingImage1Src ? <motion.img src={floatingImage1Src} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} alt="Floating 1" /> : <Typography variant="caption">No image</Typography>} */}
              {floatingImage1Src ? <motion.img src={floatingImage1Src} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} animate={getAnimationVariant(localData?.main_floating_image_config?.animation_type || 'bounce')} transition={getAnimationTransition(localData?.main_floating_image_config?.animation_type || 'bounce')} alt="Floating 1" /> : <Typography variant="caption">No image</Typography>}
            </Box>

            <Box sx={{ width: { xs: '100%', md: '30%' } }}>
              <Button variant="outlined" component="label" fullWidth>
                Tải ảnh lên
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    update({ main_floating_image_file: file });
                  }}
                />
              </Button>

              <FormControl fullWidth>
                <InputLabel>Kiểu chuyển động</InputLabel>
                <Select
                  value={localData?.main_floating_image_config?.animation_type || 'bounce'}
                  label="Kiểu chuyển động"
                  onChange={(e) => {
                    update({
                      main_floating_image_config: {
                        ...localData?.main_floating_image_config,
                        animation_type: e.target.value as 'bounce' | 'float' | 'horizontal',
                      },
                    });
                  }}
                >
                  <MenuItem value="bounce">Nhảy lên xuống</MenuItem>
                  <MenuItem value="float">Bay lơ lửng</MenuItem>
                  <MenuItem value="horizontal">Chuyển động ngang</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* Floating Image 2 */}
        <Box>
          <Typography fontWeight={600} mb={0.5}>
            Ảnh động 2 (Di chuyển + xoay)
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                flex: 1,
                width: { xs: '100%', md: '70%' },
                height: { xs: 150, sm: 200, md: 250 },
                border: '1px dashed #ccc',
                borderRadius: 1,
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {floatingImage2Src ? <motion.img src={floatingImage2Src} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} alt="Floating 2" /> : <Typography variant="caption">No image</Typography>}
            </Box>

            <Box sx={{ width: { xs: '100%', md: '30%' } }}>
              <Button variant="outlined" component="label" fullWidth>
                Chọn ảnh động 2
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    update({ button_decor_image_file: file });
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Static Image 1 */}
        <Box>
          <Typography fontWeight={600} mb={0.5}>
            Ảnh tĩnh 1
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                flex: 1,
                width: { xs: '100%', md: '70%' },
                height: { xs: 150, sm: 200, md: 250 },
                border: '1px dashed #ccc',
                borderRadius: 1,
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {staticImage1Src ? <img src={staticImage1Src} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} alt="Static" /> : <Typography variant="caption">No image</Typography>}
            </Box>

            <Box sx={{ width: { xs: '100%', md: '30%' } }}>
              <Button variant="outlined" component="label" fullWidth>
                Chọn ảnh tĩnh 1
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    update({ title_decor_image_file: file });
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Action Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Switch checked={localData.show_action_button} onChange={(e) => update({ show_action_button: e.target.checked })} />
          <Typography>Hiển thị nút Tìm khóa học</Typography>
        </Box>

        {/* Action Button Text */}
        <TextField label="Button text" value={localData.action_button_text ?? ''} disabled={!localData.show_action_button} onChange={(e) => update({ action_button_text: e.target.value })} fullWidth />
      </DialogContent>

      <DialogActions sx={{ px: 2 }}>
        <Box sx={{ flex: 1, display: 'flex' }}>
          {/* <Button variant="contained" color="success" onClick={() => handleUpdate(localData!, true)}>
            Mặc định
          </Button> */}
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button onClick={onClose}>Đóng</Button>
          <Button variant="contained" onClick={() => handleUpdate(localData!, false)}>
            Cập nhật
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditBannerDialog;

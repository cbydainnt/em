import { Box, Typography, Button, Paper, IconButton, Tooltip } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditBannerDialog from './EM_EditBannerDialog';
import { useAuthStore } from '@/hooks/useAuthStore';
import LaunchIcon from '@mui/icons-material/Launch';
import type { BannerConfig } from '@/helpers/types';
import { getAnimationTransition, getAnimationVariant } from '@/helpers/animation';
import { useThemeStore } from '@/hooks/useThemeEventStore';
import { bannerImage } from '@/helpers/theme';
const Banner = () => {
  const { authData } = useAuthStore();
  const navigate = useNavigate();
  const [bannerConfig, setBannerConfig] = useState<BannerConfig | null>(null);
  const [draftConfig, setDraftConfig] = useState<BannerConfig | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const displayConfig = draftConfig ?? bannerConfig;
  const { theme, fetchTheme } = useThemeStore();
  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await axios.get('/api/admin/banner/active');
        if (res?.data) {
          setBannerConfig(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchBanner();
    fetchTheme();
  }, []);

  const getImageSrc = (file?: File, src?: string) => {
    if (file) return URL.createObjectURL(file);
    if (src) return 'api/file/view/' + src;
    return undefined;
  };

  const mainImageSrc = getImageSrc(displayConfig?.main_image_file, displayConfig?.main_image_src);
  const mainFloatingSrc = getImageSrc(displayConfig?.main_floating_image_file, displayConfig?.main_floating_image_config?.src);
  const buttonFloatingSrc = getImageSrc(displayConfig?.button_decor_image_file, displayConfig?.button_decor_image_src);
  const titleImageSrc = getImageSrc(displayConfig?.title_decor_image_file, displayConfig?.title_decor_image_src);

  const handleSubmit = async (data: BannerConfig, isReset: boolean) => {
    try {
      const res = await axios.put('/api/admin/banner/upsert', {
        ...data,
        userId: authData?.id,
        isReset,
      });

      if (isReset) {
        setBannerConfig((prev) =>
          prev
            ? {
                ...prev,
                title_segments: res.data.title_segments,
                description_config: res.data.description_config,
                background_css: res.data.background_css,
                main_image_src: res.data.main_image_src,
                main_floating_image_src: res.data.main_floating_image_src,
                title_decor_image_src: res.data.title_decor_image_src,
                button_decor_image_src: res.data.button_decor_image_src,
                show_action_button: res.data.show_action_button,
              }
            : res.data,
        );

        // setPreviewMainImage(null);
      } else {
        setBannerConfig(res.data);
      }
      setDraftConfig(null);
      setOpenEdit(false);
    } catch (error) {
      console.error('Cập nhật banner thất bại:', error);
    }
  };

  const handleButtonClick = () => {
    navigate('/tat-ca-khoa-hoc');
  };

  const assets = bannerImage[theme as keyof typeof bannerImage];
  return (
    <Paper
      sx={{
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 6 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        height: { xs: 'auto', md: 500 },
        overflow: 'hidden',
        position: 'relative',
        background: displayConfig?.background_css,
      }}
    >
      {theme && (
        <>
          <Box
            component="img"
            src={assets.topLeftImg}
            sx={{
              position: 'absolute',
              left:
                {
                  newyear: 200,
                  christmas: 200,
                  independence: 100,
                  default: 200,
                }[theme] ?? 200,
              top: 0,
              height:
                {
                  newyear: '60%',
                  christmas: '60%',
                  independence: '40%',
                  default: '60%',
                }[theme] ?? '60%',
              objectFit: 'contain',
              pointerEvents: 'none',
              zIndex: 2,
              transform: 'translate(-30%, 0%)',
              display: {
                xs: 'none',
                sm: 'none',
                md: 'block',
              },
            }}
          />
          <Box
            component="img"
            src={assets.bottomLeftImg}
            sx={{
              position: 'absolute',
              left:
                {
                  newyear: 200,
                  christmas: 200,
                  independence: 100,
                  default: 200,
                }[theme] ?? 200,
              bottom: 0,
              height: '60%',
              objectFit: 'contain',
              pointerEvents: 'none',
              zIndex: 2,
              transform: 'translate(-30%, 0%)',
              display: {
                xs: 'none',
                sm: 'none',
                md: 'block',
              },
            }}
          />
        </>
      )}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: { xs: 'center', md: 'flex-end' },
          gap: 2,
          zIndex: 2,
        }}
      >
        {authData?.type === 'admin' && (
          <Tooltip title="Chỉnh sửa banner" arrow>
            <IconButton
              size="large"
              sx={{
                position: 'absolute',
                top: 10,
                right: 20,
                bgcolor: 'transparent',
                color: 'text.secondary',

                '&:hover': {
                  bgcolor: 'transparent',
                  color: 'primary.main',
                },
              }}
              onClick={() => {
                setDraftConfig(bannerConfig);
                setOpenEdit(true);
              }}
            >
              <LaunchIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Tooltip>
        )}
        <Box
          sx={{
            position: 'relative',
            maxWidth: 570,
            width: '100%',
          }}
        >
          <Box
            component="img"
            src={titleImageSrc}
            sx={{
              position: 'absolute',
              top: { xs: '5px', md: '8%' },
              left: { xs: '10%', md: '-40px' },
              transform: { xs: 'translateX(-50%)', md: 'none' },
              width: { xs: 120, md: 120 },
              pointerEvents: 'none',
              zIndex: -2,
            }}
          />
          {displayConfig?.title_segments?.map((seg, idx) => (
            <span
              key={idx}
              style={{
                color: seg.color,
                fontSize: seg.font_size && `${seg.font_size}px`,
                fontWeight: seg.font_weight,
                fontFamily: seg.font_family,
              }}
            >
              {seg.text}
            </span>
          ))}
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: displayConfig?.description_config?.color || '#fff',
            display: 'block',
            fontFamily: displayConfig?.description_config?.font_family || 'Poppins, cursive',
            fontSize: displayConfig?.description_config?.font_size ? `${displayConfig.description_config.font_size}px` : '18px',
            maxWidth: '570px',
            lineHeight: '32px',
            marginLeft: 0,
            textAlign: { xs: 'center', md: 'left' },
            height: 'auto',
            minHeight: { md: '62.25px' },
          }}
        >
          {displayConfig?.description_config?.text}
        </Typography>

        <Box
          sx={{
            width: '100%',
            maxWidth: 570,
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <motion.img
            src={buttonFloatingSrc}
            style={{
              position: 'absolute',
              bottom: '80%',
              left: '25%',
              width: 120,
              transform: 'translateX(-50%)',
              pointerEvents: 'none',
              zIndex: -99,
            }}
            animate={{
              y: [0, -12, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          {displayConfig?.show_action_button && (
            <Button
              sx={{
                px: 4,
                py: 1.2,
                fontSize: 16,
                fontWeight: 600,
                backgroundColor: 'rgb(238, 74, 98)',
                color: '#fff',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                },
              }}
              onClick={handleButtonClick}
            >
              {displayConfig.action_button_text}
              <ArrowRightAltIcon sx={{ ml: 1 }}></ArrowRightAltIcon>
            </Button>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: {
            xs: 'center',
            md: 'flex-start',
          },
          alignItems: 'flex-end',
          mt: { xs: 4, md: 0 },
          position: 'relative',
          ml: '2em',
        }}
      >
        {/* <motion.img
          src={mainFloatingSrc}
          style={{
            position: 'absolute',
            top: 45,
            left: -40,
            width: 'clamp(80px, 8vw, 100px)',
            pointerEvents: 'none',
            zIndex: 3,
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        /> */}
        {mainFloatingSrc ? <motion.img src={mainFloatingSrc} style={{ position: 'absolute', top: 45, left: -40, width: 'clamp(80px, 8vw, 100px)', pointerEvents: 'none', zIndex: 3 }} animate={getAnimationVariant(displayConfig?.main_floating_image_config?.animation_type || 'bounce')} transition={getAnimationTransition(displayConfig?.main_floating_image_config?.animation_type || 'bounce')} alt="Floating 1" /> : <Typography variant="caption"></Typography>}
        {/* {floatingImage1Src ? <motion.img src={floatingImage1Src} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} animate={getAnimationVariant(localData?.main_floating_image_config?.animation_type || 'bounce')} transition={getAnimationTransition(localData?.main_floating_image_config?.animation_type || 'bounce')} alt="Floating 1" /> : <Typography variant="caption">No image</Typography>} */}
        <Box
          sx={{
            position: 'relative',
            display: 'inline-block', // quan trọng để wrapper co theo ảnh
          }}
        >
          <Box
            component="img"
            src={mainImageSrc}
            sx={{
              height: {
                xs: {
                  newyear: '30%',
                  christmas: '25%',
                  independence: '35%',
                  default: '30%',
                }[theme],
                sm: {
                  newyear: '40%',
                  christmas: 500,
                  independence: '45%',
                  default: '40%',
                }[theme],
                md: {
                  newyear: '50%',
                  christmas: 500,
                  independence: 300,
                  default: '20%',
                }[theme],
                lg: {
                  newyear: 500,
                  christmas: 500,
                  independence: 350,
                  default: '55%',
                }[theme],
              },
              // width: 'auto',
              pointerEvents: 'none',
            }}
          />

          <Box
            component="img"
            src={assets.topRightImg}
            sx={{
              position: 'absolute',
              top:
                {
                  newyear: 0,
                  christmas: -20,
                  independence: -70,
                  default: -50,
                }[theme] ?? -50,
              left:
                {
                  newyear: 450,
                  christmas: 300,
                  independence: 70,
                  default: 250,
                }[theme] ?? 250,
              height:
                {
                  newyear: '50%',
                  christmas: '40%',
                  independence: '40%',
                  default: '50%',
                }[theme] ?? '70%',
              pointerEvents: 'none',
              zIndex: 3,
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
          />

          <Box
            component="img"
            src={assets.bottomRightImg}
            sx={{
              position: 'absolute',
              left:
                {
                  newyear: 450,
                  christmas: 300,
                  independence: 200,
                  default: 250,
                }[theme] ?? 250,
              bottom:
                {
                  newyear: 0,
                  christmas: -30,
                  independence: 200,
                  default: -50,
                }[theme] ?? -50,
              height: '50%',
              objectFit: 'contain',
              pointerEvents: 'none',
              zIndex: 3,
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
          />
        </Box>
      </Box>
      <EditBannerDialog open={openEdit} initialData={draftConfig} onClose={() => setOpenEdit(false)} onSubmit={handleSubmit} />
    </Paper>
  );
};

export default Banner;

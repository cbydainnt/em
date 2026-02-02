import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { join } from 'path';
import { writeFile } from 'fs/promises';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    // const api = new StableDiffusionApi();

    // const api = new StableDiffusionApi({
    //   host: 'localhost',
    //   port: 7861,
    //   protocol: 'http',
    //   defaultSampler: 'Euler a',
    //   defaultStepCount: 20,
    // });
    // api.setAuth('binhnx', 'admin@213');
    try {
      const response = await fetch('http://127.0.0.1:7861/sdapi/v1/txt2img', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Basic  ${Buffer.from('binhnx:admin@213').toString('base64')}`,
        },
        body: JSON.stringify({
          prompt: 'very tall building, cyberpunk dystopia, massive skyscraper, immense scale, scifi, cinematic, award winning, volumetric light and fog, neon palette, subsurface scattering, caustics, bloom, perfect exposure, perfect composition, rule of thirds, 8k',
        }),
      });
      if (response.ok) {
        const responseJSON = await response.json();
        for (const image of responseJSON.images) {
          const destinationDirPath = join(process.cwd(), `../../out/dd${Date.now().toString()}.png`);
          const buffer = Buffer.from(image, 'base64');
          await writeFile(destinationDirPath, buffer as Uint8Array);
        }
      }
      //   // const api = new StableDiffusionApi({
      //   //   baseUrl: 'http://127.0.0.1:7860',
      //   // });

      //   const result = await api.txt2img({
      //     prompt: 'beautiful painting of a deer-headed man',
      //     negative_prompt: '',
      //     styles: null,
      //     seed: -1,
      //     subseed: -1,
      //     subseed_strength: 0,
      //     seed_resize_from_h: -1,
      //     seed_resize_from_w: -1,
      //     sampler_name: null,
      //     // scheduler: null,
      //     batch_size: 1,
      //     n_iter: 1,
      //     steps: 50,
      //     cfg_scale: 7.0,
      //     width: 512,
      //     height: 512,
      //     restore_faces: null,
      //     tiling: null,
      //     do_not_save_samples: false,
      //     do_not_save_grid: false,
      //     eta: null,
      //     denoising_strength: null,
      //     // s_min_uncond: null,
      //     s_churn: null,
      //     s_tmax: null,
      //     s_tmin: null,
      //     s_noise: null,
      //     override_settings: null,
      //     override_settings_restore_afterwards: true,
      //     // refiner_checkpoint: null,
      //     // refiner_switch_at: null,
      //     // disable_extra_networks: false,
      //     // firstpass_image: null,
      //     // comments: null,
      //     enable_hr: false,
      //     firstphase_width: 0,
      //     firstphase_height: 0,
      //     hr_scale: 2.0,
      //     hr_upscaler: null,
      //     hr_second_pass_steps: 0,
      //     hr_resize_x: 0,
      //     hr_resize_y: 0,
      //     // hr_checkpoint_name: null,
      //     // hr_sampler_name: null,
      //     // hr_scheduler: null,
      //     // hr_prompt: '',
      //     // hr_negative_prompt: '',
      //     // force_task_id: null,
      //     // sampler_index: 'DDIM',
      //     script_name: null,
      //     script_args: [],
      //     send_images: true,
      //     save_images: false,
      //     alwayson_scripts: {},
      //     // infotext: null,
      //   });
      //   const buffer = await result.images[0].toBuffer();
      //   const destinationDirPath = join(process.cwd(), `../../out/sssssss.png`);
      // await writeFile(destinationDirPath, buffer as Uint8Array);
    } catch (error: any) {
      console.log(error.message);
    }

    return this.appService.getHello();
  }
}

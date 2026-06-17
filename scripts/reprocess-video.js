import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure ffmpeg path
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const INTRO_DIR = 'D:/My Projects/Doctor/Introsequence';
const OUTPUT_VIDEO_DIR = path.resolve(__dirname, '../public/videos');

async function processMedia() {
  console.log('Starting high-quality video encoding...');

  if (!fs.existsSync(OUTPUT_VIDEO_DIR)) {
    fs.mkdirSync(OUTPUT_VIDEO_DIR, { recursive: true });
  }

  const introVideoPath = path.join(OUTPUT_VIDEO_DIR, 'intro.webm');
  console.log(`Generating HD intro video at ${introVideoPath}...`);

  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(`${INTRO_DIR}/ezgif-frame-%03d.png`)
      .inputOptions(['-framerate 30'])
      .outputOptions([
        '-c:v libvpx-vp9',
        '-crf 15', // Much higher quality (lower number = better quality)
        '-b:v 0',
        '-pix_fmt yuva420p',
        '-auto-alt-ref 0'
      ])
      .output(introVideoPath)
      .on('end', () => {
        console.log('HD Intro video generated successfully.');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error generating intro video:', err);
        reject(err);
      })
      .run();
  });
}

processMedia().catch(console.error);

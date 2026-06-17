import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure ffmpeg path
ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const INTRO_DIR = 'D:/My Projects/Doctor/Introsequence';
const HERO_BG_DIR = 'D:/My Projects/Doctor/HomePagebackground';

const OUTPUT_VIDEO_DIR = path.resolve(__dirname, '../public/videos');
const OUTPUT_BG_DIR = path.resolve(__dirname, '../public/images/hero-bg');

async function processMedia() {
  console.log('Starting media processing...');

  // 1. Process Intro Sequence into WebM
  if (!fs.existsSync(OUTPUT_VIDEO_DIR)) {
    fs.mkdirSync(OUTPUT_VIDEO_DIR, { recursive: true });
  }

  const introVideoPath = path.join(OUTPUT_VIDEO_DIR, 'intro.webm');
  console.log(`Generating intro video at ${introVideoPath}...`);

  await new Promise((resolve, reject) => {
    ffmpeg()
      .input(`${INTRO_DIR}/ezgif-frame-%03d.png`)
      .inputOptions(['-framerate 30'])
      .outputOptions([
        '-c:v libvpx-vp9',
        '-crf 30',
        '-b:v 0',
        '-pix_fmt yuva420p',
        '-auto-alt-ref 0'
      ])
      .output(introVideoPath)
      .on('end', () => {
        console.log('Intro video generated successfully.');
        resolve();
      })
      .on('error', (err) => {
        console.error('Error generating intro video:', err);
        reject(err);
      })
      .run();
  });

  // 2. Process Hero Background Images to WebP
  if (!fs.existsSync(OUTPUT_BG_DIR)) {
    fs.mkdirSync(OUTPUT_BG_DIR, { recursive: true });
  }

  const bgFiles = fs.readdirSync(HERO_BG_DIR).filter(file => file.endsWith('.png') || file.endsWith('.jpg')).sort();
  console.log(`Found ${bgFiles.length} hero background frames. Processing to WebP...`);

  for (let i = 0; i < bgFiles.length; i++) {
    const file = bgFiles[i];
    const inputPath = path.join(HERO_BG_DIR, file);
    const outputFileName = `frame-${String(i).padStart(3, '0')}.webp`;
    const outputPath = path.join(OUTPUT_BG_DIR, outputFileName);

    if (i % 20 === 0) console.log(`Processing ${file} -> ${outputFileName}...`);

    try {
      await sharp(inputPath)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }

  console.log('Media processing completed!');
}

processMedia().catch(console.error);

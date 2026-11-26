// Generates the uniform 3:4 grayscale portraits used on the covers.
//
//   npm run photos
//
// Reads  src/assets/authors/originals/<id>.jpg
// Writes src/assets/authors/cropped/<id>.jpg   (600 x 800)
//
// To add or replace a photo: drop the original into `originals/`, add/adjust its
// crop box below (in the original image's pixels, any 3:4 box framing the face),
// then run the script again.
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = path.dirname(fileURLToPath(import.meta.url))
const srcDir = path.resolve(root, '../src/assets/authors/originals')
const outDir = path.resolve(root, '../src/assets/authors/cropped')

const OUTPUT = { width: 600, height: 800 }

/** id -> crop box in the original's pixel space */
const crops = {
  'vhugala-mathivha': { left: 160, top: 140, width: 600, height: 800 },
  'boitumelo-magashula': { left: 674, top: 660, width: 1100, height: 1467 },
  'asanda-thabethe': { left: 300, top: 850, width: 1500, height: 2000 },
  'hlulani-ndlovu': { left: 248, top: 349, width: 2400, height: 3200 },
  'nyiko-tsonani': { left: 10, top: 60, width: 640, height: 853 },
}

await mkdir(outDir, { recursive: true })

for (const [id, box] of Object.entries(crops)) {
  const input = path.join(srcDir, `${id}.jpg`)
  const output = path.join(outDir, `${id}.jpg`)
  await sharp(input)
    .rotate() // respect EXIF orientation
    .extract(box)
    .resize(OUTPUT.width, OUTPUT.height)
    .grayscale()
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(output)
  console.log(`✓ ${id}`)
}

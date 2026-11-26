// Removes the placeholder text from the cover template so only its background
// (white page, black corners, shattered shards) remains.
//
//   npm run cover
//
// Reads  src/assets/cover/template-original.jpg
// Writes src/assets/cover/cover-background.jpg
//
// Each text box is filled by blending the pixels just outside it (vertical +
// horizontal interpolation), which keeps the template's soft shading intact.
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = path.dirname(fileURLToPath(import.meta.url))
const input = path.resolve(root, '../src/assets/cover/template-original.jpg')
const output = path.resolve(root, '../src/assets/cover/cover-background.jpg')

/** Placeholder text boxes, in template pixels (626 x 885). */
const textBoxes = [
  { name: 'ANNUAL REPORT | 2019', left: 394, top: 28, right: 596, bottom: 86 },
  { name: 'HEADLINE / BUSINESS BROCHURE', left: 168, top: 356, right: 456, bottom: 472 },
  // narrower so its bottom edge stays clear of the shards on the right
  { name: 'lorem ipsum', left: 190, top: 472, right: 430, bottom: 521 },
  { name: 'COMPANY NAME + social icons', left: 28, top: 756, right: 146, bottom: 856 },
]

const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, channels } = info
const at = (x, y, c) => data[(y * width + x) * channels + c]

for (const box of textBoxes) {
  const { left, top, right, bottom } = box
  for (let y = top; y <= bottom; y++) {
    const ty = (y - top + 1) / (bottom - top + 2)
    for (let x = left; x <= right; x++) {
      const tx = (x - left + 1) / (right - left + 2)
      for (let c = 0; c < channels; c++) {
        const vertical = at(x, top - 1, c) * (1 - ty) + at(x, bottom + 1, c) * ty
        const horizontal = at(left - 1, y, c) * (1 - tx) + at(right + 1, y, c) * tx
        data[(y * width + x) * channels + c] = Math.round((vertical + horizontal) / 2)
      }
    }
  }
  console.log(`✓ removed ${box.name}`)
}

await sharp(data, { raw: info }).jpeg({ quality: 92, mozjpeg: true }).toFile(output)

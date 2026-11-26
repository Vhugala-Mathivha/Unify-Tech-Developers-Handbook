// Generates the grayscale author photos used on the covers.
//
//   npm run photos
//
// Reads  src/assets/authors/originals/<id>.jpg
// Writes src/assets/authors/cropped/<id>.jpg  600 x 800 portrait (back cover)
//        src/assets/authors/puzzle/<id>.jpg   600 x 600 square (front-cover puzzle pieces)
//
// To add or replace a photo: drop the original into `originals/`, add/adjust
// its settings below, then run the script again.
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = path.dirname(fileURLToPath(import.meta.url))
const authorsDir = path.resolve(root, '../src/assets/authors')
const srcDir = path.join(authorsDir, 'originals')

/**
 * id -> crop settings, in the original's pixel space.
 *   portrait   3:4 box, face centred horizontally and ~40% down (back cover)
 *   zoomOut    puzzle crop width as a multiple of the portrait width; larger
 *              = face smaller in the puzzle piece. Tight originals (close-ups,
 *              narrow photos) need more so every face shows at a similar size.
 *   extendWith how to fill the puzzle crop where it runs past the photo edge:
 *              'copy' repeats the edge pixels (plain backgrounds),
 *              'mirror' reflects the image (textures such as a brick wall).
 *   inset      px trimmed off every edge of the original before extending
 *              (e.g. to drop white rounded corners)
 */
const authors = {
  'vhugala-mathivha': {
    portrait: { left: 160, top: 140, width: 600, height: 800 },
    zoomOut: 1.75,
    extendWith: 'copy',
  },
  'boitumelo-magashula': {
    portrait: { left: 674, top: 660, width: 1100, height: 1467 },
    zoomOut: 1.3,
  },
  'asanda-thabethe': {
    portrait: { left: 300, top: 850, width: 1500, height: 2000 },
    zoomOut: 1.3,
  },
  'hlulani-ndlovu': {
    portrait: { left: 248, top: 349, width: 2400, height: 3200 },
    zoomOut: 1.7, // close-up selfie; any wider and the mirror reaches the face
    extendWith: 'mirror',
  },
  'nyiko-tsonani': {
    portrait: { left: 10, top: 60, width: 640, height: 853 },
    zoomOut: 1.55,
    extendWith: 'mirror', // her left knob shows this fill; 'copy' streaks there
    inset: 40, // original has white rounded corners; trim them before extending
  },
}

/** Where the face sits vertically in the square puzzle crop (a little above centre). */
const PUZZLE_FACE_Y = 0.44

/** Square box around the portrait's face. May run past the image edges. */
function puzzleBox({ portrait: p, zoomOut }) {
  const side = Math.round(p.width * zoomOut)
  const faceX = p.left + p.width / 2
  const faceY = p.top + p.height * 0.4
  return {
    left: Math.round(faceX - side / 2),
    top: Math.round(faceY - side * PUZZLE_FACE_Y),
    width: side,
    height: side,
  }
}

/**
 * Extract `box`, first padding the image if the box runs past its edges.
 * With `inset`, the original's outer border is trimmed first (box coordinates
 * stay in the original's pixel space).
 */
async function extractBox(input, box, extendWith = 'copy', inset = 0) {
  let image = sharp(input).rotate() // respect EXIF orientation
  let { width: w, height: h } = await image.metadata()
  if (inset) {
    w -= 2 * inset
    h -= 2 * inset
    image = sharp(await image.extract({ left: inset, top: inset, width: w, height: h }).toBuffer())
    box = { ...box, left: box.left - inset, top: box.top - inset }
  }
  const pad = {
    left: Math.max(0, -box.left),
    top: Math.max(0, -box.top),
    right: Math.max(0, box.left + box.width - w),
    bottom: Math.max(0, box.top + box.height - h),
  }
  if (!pad.left && !pad.top && !pad.right && !pad.bottom) return image.extract(box)
  const padded = await image.extend({ ...pad, extendWith }).toBuffer()
  return sharp(padded).extract({ ...box, left: box.left + pad.left, top: box.top + pad.top })
}

const outputs = [
  { dir: 'cropped', size: [600, 800], box: (a) => a.portrait },
  { dir: 'puzzle', size: [600, 600], box: puzzleBox },
]

for (const { dir } of outputs) await mkdir(path.join(authorsDir, dir), { recursive: true })

for (const [id, settings] of Object.entries(authors)) {
  const input = path.join(srcDir, `${id}.jpg`)
  for (const { dir, size, box } of outputs) {
    // inset only matters where the crop is extended (the puzzle crop)
    const inset = dir === 'puzzle' ? settings.inset : 0
    const cropped = await extractBox(input, box(settings), settings.extendWith, inset)
    await cropped
      .resize(size[0], size[1])
      .grayscale()
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(path.join(authorsDir, dir, `${id}.jpg`))
  }
  console.log(`✓ ${id}`)
}

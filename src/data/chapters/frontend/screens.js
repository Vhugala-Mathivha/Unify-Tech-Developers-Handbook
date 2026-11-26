// ARMS screenshots for the Frontend chapters, by file name (without .webp).
// Captured from ARMS.Frontend running locally with its dev sign-in accounts.
const files = import.meta.glob('../../../assets/screens/frontend/*.webp', { eager: true, import: 'default' })
const byName = Object.fromEntries(Object.entries(files).map(([path, url]) => [path.split('/').pop().replace('.webp', ''), url]))

/** A screen for a chapter spread. Throws during the build if the file is missing. */
export function screen(name, alt, caption) {
  const src = byName[name]
  if (!src) throw new Error(`No screenshot named ${name}`)
  return { src, alt, caption }
}

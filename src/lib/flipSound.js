// Synthesised paper page-turn sound (Web Audio) — no audio file needed.
// To use a recorded sound instead, drop an mp3 at public/sounds/page-flip.mp3
// and set USE_FILE = true.
const USE_FILE = false
let ctx
let noiseBuffer

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function getNoise(ac) {
  if (noiseBuffer) return noiseBuffer
  const len = Math.floor(ac.sampleRate * 0.8)
  noiseBuffer = ac.createBuffer(1, len, ac.sampleRate)
  const data = noiseBuffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < len; i++) {
    // Brown-ish noise with random crackles reads as "paper" more than white noise.
    const white = Math.random() * 2 - 1
    last = (last + 0.06 * white) / 1.06
    const crackle = Math.random() < 0.004 ? (Math.random() * 2 - 1) * 0.9 : 0
    data[i] = last * 3.2 + white * 0.25 + crackle
  }
  return noiseBuffer
}

function burst(ac, { start, duration, from, to, q, peak, attack }) {
  const src = ac.createBufferSource()
  src.buffer = getNoise(ac)
  src.playbackRate.value = 0.9 + Math.random() * 0.2

  const band = ac.createBiquadFilter()
  band.type = 'bandpass'
  band.Q.value = q
  band.frequency.setValueAtTime(from, start)
  band.frequency.exponentialRampToValueAtTime(to, start + duration)

  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.0001, start)
  gain.gain.exponentialRampToValueAtTime(peak, start + attack)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)

  src.connect(band).connect(gain).connect(ac.destination)
  src.start(start, Math.random() * 0.2, duration + 0.05)
}

export function playFlipSound() {
  if (USE_FILE) {
    const a = new Audio('/sounds/page-flip.mp3')
    a.volume = 0.6
    a.play().catch(() => {})
    return
  }
  const ac = getCtx()
  if (!ac) return
  const t = ac.currentTime + 0.01
  // Lift + swoosh of the page through the air.
  burst(ac, { start: t, duration: 0.42, from: 3200, to: 900, q: 0.9, peak: 0.35, attack: 0.12 })
  // Crisp edge rustle on top.
  burst(ac, { start: t + 0.03, duration: 0.28, from: 6000, to: 2600, q: 1.4, peak: 0.12, attack: 0.05 })
  // Soft landing as the page settles.
  burst(ac, { start: t + 0.36, duration: 0.12, from: 700, to: 300, q: 0.7, peak: 0.22, attack: 0.01 })
}

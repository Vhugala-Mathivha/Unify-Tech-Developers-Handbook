import { useState } from 'react'

/**
 * A screenshot of ARMS. Click it to hide it (the code below gets the space);
 * "Show Image Again" brings it back.
 *
 * Both controls are <button>s with inert children: the flip engine only leaves
 * clicks alone when the click target itself is a button.
 */
export default function ScreenImage({ src, alt, caption }) {
  const [hidden, setHidden] = useState(false)

  if (hidden) {
    return (
      <button type="button" className="screen__show" onClick={() => setHidden(false)}>
        <span>Show Image Again</span>
      </button>
    )
  }

  return (
    <figure className="screen">
      <button
        type="button"
        className="screen__button"
        onClick={() => setHidden(true)}
        aria-label={`${alt}. Click to hide the image.`}
      >
        <img className="screen__img" src={src} alt="" draggable="false" loading="lazy" decoding="async" />
        <span className="screen__hint" aria-hidden="true">
          Click to hide
        </span>
      </button>
      <figcaption className="screen__caption">{caption}</figcaption>
    </figure>
  )
}

# Power Clicks

> Make every click hit harder.

Lightweight click impact animations powered by the Canvas API. Adds impact rays, a shockwave flash and screenshake to any click event — zero dependencies.

## Installation

```bash
npm install power-clicks
```

## Usage

```ts
import { runImpactAnimation } from 'power-clicks'

button.addEventListener('click', (e) => {
  runImpactAnimation(e.clientX, e.clientY, e.currentTarget as HTMLElement)
})
```

## API

### `runImpactAnimation(x, y, target)`

| Parameter       | Type          | Description                              |
|-----------------|---------------|------------------------------------------|
| `x`             | `number`      | Click X position (e.g. `e.clientX`)      |
| `y`             | `number`      | Click Y position (e.g. `e.clientY`)      |
| `target`        | `HTMLElement` | Element to apply the screenshake effect  |
| `sound?`        | `SoundName`   | The sound effect that will play on click |
| `soundVolume?`  | `number`      | The volume of the sound effect           |

## License

MIT
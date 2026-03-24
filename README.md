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
  runImpactAnimation({
    x: e.clientX,
    y: e.clientY,
    target: e.currentTarget as HTMLElement,
  })
})
```

With custom sound and volume:

```ts
runImpactAnimation({
  x: e.clientX,
  y: e.clientY,
  target: e.currentTarget as HTMLElement,
  sound: 'slap',
  volume: 0.5,
})
```

## API

### `runImpactAnimation(options: ImpactOptions)`

| Option     | Type          | Default        | Description                             |
|------------|---------------|----------------|-----------------------------------------|
| `x`        | `number`      | —              | Click X position (e.g. `e.clientX`)     |
| `y`        | `number`      | —              | Click Y position (e.g. `e.clientY`)     |
| `target`   | `HTMLElement`  | —              | Element to apply the screenshake effect |
| `sound`    | `SoundName`   | `"cinematic"`  | Sound effect to play on click           |
| `volume`   | `number`      | `1`            | Sound volume (0 to 1)                   |

### Available sounds

`"cartoon"` · `"cinematic"` · `"impacto"` · `"minecraft"` · `"pixel_gun"` · `"slap"` · `"sword"` · `"undertale-hit"`

## TypeScript

The package exports the following types:

```ts
import type { ImpactOptions, SoundName } from 'power-clicks'
```

- **`ImpactOptions`** — the options object accepted by `runImpactAnimation`
- **`SoundName`** — union of all available sound names

### Audio assets and bundler configuration

Power Clicks ships `.mp3` files as bundled assets. Most modern bundlers (Vite, webpack, esbuild, etc.) handle this automatically. If your TypeScript setup raises errors about `.mp3` imports, add a type declaration file (e.g. `audio.d.ts`) to your project:

```ts
declare module '*.mp3' {
  const src: string
  export default src
}
```

Make sure the file is included in your `tsconfig.json`:

```json
{
  "include": ["src", "audio.d.ts"]
}
```

> **Note:** This is only needed if your project directly imports `.mp3` files. If you're just using `runImpactAnimation`, the audio is handled internally and no extra configuration is required.

## License

MIT

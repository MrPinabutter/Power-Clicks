export type SoundName =
  | "cartoon"
  | "cinematic"
  | "impacto"
  | "minecraft"
  | "pixel_gun"
  | "slap"
  | "sword"
  | "undertale-hit";



export function playSound(name: SoundName, volume = 1): void {
  const audio = new Audio(
    new URL(`./sounds/${name}.mp3`, import.meta.url).href,
  );

  audio.volume = Math.min(1, Math.max(0, volume));
  audio.play().catch(() => {
    console.error("Error playing sound:", name);
  });
}

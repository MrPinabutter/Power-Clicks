import cartoonSrc from "./sounds/cartoon.mp3";
import cinematicSrc from "./sounds/cinematic.mp3";
import impactoSrc from "./sounds/impacto.mp3";
import minecraftSrc from "./sounds/minecraft.mp3";
import pixelGunSrc from "./sounds/pixel_gun.mp3";
import slapSrc from "./sounds/slap.mp3";
import swordSrc from "./sounds/sword.mp3";
import undertaleHitSrc from "./sounds/undertale-hit.mp3";

export type SoundName =
  | "cartoon"
  | "cinematic"
  | "impacto"
  | "minecraft"
  | "pixel_gun"
  | "slap"
  | "sword"
  | "undertale-hit";

export const SOUND_MAP: Record<SoundName, string> = {
  cartoon: cartoonSrc,
  cinematic: cinematicSrc,
  impacto: impactoSrc,
  minecraft: minecraftSrc,
  pixel_gun: pixelGunSrc,
  slap: slapSrc,
  sword: swordSrc,
  "undertale-hit": undertaleHitSrc,
};

export function playSound(name: SoundName, volume = 1): void {
  const src = SOUND_MAP[name];
  if (!src) return;

  const audio = new Audio(src);

  audio.volume = Math.min(1, Math.max(0, volume));
  audio.play().catch(() => {
    console.error("Error playing sound:", name);
  });
}

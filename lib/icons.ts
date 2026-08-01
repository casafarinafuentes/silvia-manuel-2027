import {
  CarFront,
  Gem,
  Martini,
  Utensils,
  CakeSlice,
  Sparkles,
  Shirt,
  Sun,
  GlassWater,
} from "lucide-react";

export const timelineIcons = {
  car: CarFront,
  gem: Gem,
  martini: Martini,
  utensils: Utensils,
  cake: CakeSlice,
  sparkles: Sparkles,
} as const;

export const dressCodeIcons = {
  elegant: Shirt,
  summer: Sun,
  details: Sparkles,
  relax: GlassWater,
} as const;

export type TimelineIconName = keyof typeof timelineIcons;
export type DressCodeIconName = keyof typeof dressCodeIcons;
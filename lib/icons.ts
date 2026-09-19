import {
  CarFront,
  Gem,
  Martini,
  Utensils,
  CakeSlice,
  Sparkles,
  Shirt,
  Footprints,
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
  shoes: Footprints,
  jacket: Shirt,
} as const;

export type TimelineIconName = keyof typeof timelineIcons;
export type DressCodeIconName = keyof typeof dressCodeIcons;
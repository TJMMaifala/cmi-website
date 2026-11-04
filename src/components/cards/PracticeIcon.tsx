import { Briefcase, Landmark, Scale, ScrollText, Stamp, Users, type LucideProps } from "lucide-react";
import type { PracticeArea } from "@/data/practice-areas";

const map = {
  briefcase: Briefcase,
  scroll: ScrollText,
  landmark: Landmark,
  users: Users,
  stamp: Stamp,
  scale: Scale,
} as const;

export function PracticeIcon({ name, ...props }: { name: PracticeArea["icon"] } & LucideProps) {
  const Icon = map[name];
  return <Icon strokeWidth={1.25} aria-hidden {...props} />;
}

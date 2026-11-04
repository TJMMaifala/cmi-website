import { ImageReveal } from "@/components/animations/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { images } from "@/data/images";
import type { TeamMember } from "@/data/team";

export function TeamPortrait({ member, priority }: { member: TeamMember; priority?: boolean }) {
  return (
    <ImageReveal className="relative aspect-[4/5] w-full">
      <SafeImage
        image={images[member.image]}
        sizes="(min-width:1024px) 38vw, 100vw"
        priority={priority}
        className="h-full w-full"
        position="50% 15%"
        placeholderLabel={`Photograph of ${member.name} (pending)`}
      />
    </ImageReveal>
  );
}

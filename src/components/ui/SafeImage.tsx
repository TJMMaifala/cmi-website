"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/data/images";

type Props = {
  image: SiteImage;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Visible caption on the placeholder, e.g. for portraits where no stand-in photo may be invented. */
  placeholderLabel?: string;
  /** Object position for responsive cropping, e.g. "50% 20%" */
  position?: string;
};

/**
 * Renders an image from the existing website. If the file has not been downloaded yet
 * (see `npm run fetch-images`) it shows a clearly identified, branded placeholder instead
 * of a broken image or an unrelated stock photo.
 */
export function SafeImage({ image, sizes, priority, className, imgClassName, placeholderLabel, position }: Props) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className={cn("relative overflow-hidden bg-navy-800", className)}>
      {failed ? (
        <Placeholder label={placeholderLabel} />
      ) : (
        <Image
          ref={ref}
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn("object-cover", imgClassName)}
          style={position ? { objectPosition: position } : undefined}
        />
      )}
    </div>
  );
}

function Placeholder({ label }: { label?: string }) {
  return (
    <div
      role="img"
      aria-label={label ?? "Image placeholder"}
      className="absolute inset-0 flex items-end bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950"
    >
      <div className="grid-motif absolute inset-0 opacity-70" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-gold-500/60 to-transparent" aria-hidden />
      {label ? (
        <span className="relative m-4 border border-gold-500/40 bg-navy-950/60 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-300">
          {label}
        </span>
      ) : null}
    </div>
  );
}

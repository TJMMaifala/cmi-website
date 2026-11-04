export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[60svh] items-center justify-center bg-navy-900">
      <span className="block h-px w-24 animate-pulse bg-gold-500" />
      <span className="sr-only">Loading</span>
    </div>
  );
}

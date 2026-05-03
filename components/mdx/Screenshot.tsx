import Image from 'next/image';

export function Screenshot({
  src,
  alt,
  caption,
  width = 1280,
  height = 800,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-10">
      <div className="rounded-xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg)]">
        <Image src={src} alt={alt} width={width} height={height} className="w-full h-auto" />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm text-[var(--color-text-muted)] text-center">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

import './PlaceholderImage.css';

export interface PlaceholderImageProps {
  /** Chemin attendu de l'image finale, ex. "/images/voutes/plafond-francaise.jpg" */
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  /** true pour l'image LCP (Hero) : pas de lazy-loading. */
  priority?: boolean;
  className?: string;
  /** true pour remplir un parent positionné (fond plein cadre, ex. Hero) plutôt que réserver son propre ratio. */
  cover?: boolean;
}

/**
 * Tient la place d'une <Image> réelle avec exactement les mêmes props, au bon
 * ratio et aux couleurs des tokens. Remplacer un placeholder par la vraie
 * photo se limite à déposer le fichier au chemin `src` et à échanger ce
 * composant contre <Image> — voir public/images/IMAGES.md.
 */
export function PlaceholderImage({
  src,
  alt,
  width,
  height,
  sizes,
  priority,
  className,
  cover,
}: PlaceholderImageProps) {
  const filename = src.split('/').pop();

  return (
    <div
      className={`placeholder-image${cover ? ' placeholder-image--cover' : ''}${className ? ` ${className}` : ''}`}
      style={cover ? undefined : { aspectRatio: `${width} / ${height}` }}
      role="img"
      aria-label={alt}
      data-priority={priority ? 'true' : undefined}
      data-sizes={sizes}
    >
      <div className="placeholder-image__pattern" aria-hidden="true" />
      <div className="placeholder-image__label" aria-hidden="true">
        <span className="placeholder-image__filename">{filename}</span>
        <span className="placeholder-image__dims">
          {width}×{height}
        </span>
      </div>
    </div>
  );
}

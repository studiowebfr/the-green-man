import type { ReactNode } from 'react';
import './SlateBoard.css';

export interface SlateBoardProps {
  children: ReactNode;
  className?: string;
}

/** Une véritable ardoise : fond sombre, texture de craie, texte façon craie. */
export function SlateBoard({ children, className }: SlateBoardProps) {
  return (
    <div className={`slate-board${className ? ` ${className}` : ''}`}>
      <div className="slate-board__texture" aria-hidden="true" />
      <div className="slate-board__content">{children}</div>
      <div className="slate-board__tray" aria-hidden="true" />
    </div>
  );
}

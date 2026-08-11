import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import './Button.css';

type Variant = 'primary' | 'outline' | 'ghost';

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = CommonProps & { as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>;
type ButtonAsAnchor = CommonProps & { as: 'a' } & AnchorHTMLAttributes<HTMLAnchorElement>;
type ButtonAsLink = CommonProps & { as: 'link' } & LinkProps;

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

/** Bouton polymorphe : rendu <button>, <a> ou <Link> selon `as`, mêmes variantes visuelles. */
export function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  const cls = `btn btn--${variant}${className ? ` ${className}` : ''}`;

  if (rest.as === 'a') {
    const { as: _as, ...anchorRest } = rest;
    return (
      <a className={cls} {...anchorRest}>
        {children}
      </a>
    );
  }

  if (rest.as === 'link') {
    const { as: _as, ...linkRest } = rest;
    return (
      <Link className={cls} {...linkRest}>
        {children}
      </Link>
    );
  }

  const { as: _as, ...buttonRest } = rest;
  return (
    <button type="button" className={cls} {...buttonRest}>
      {children}
    </button>
  );
}

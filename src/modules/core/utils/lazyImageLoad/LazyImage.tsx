import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

type Props = {
  src: string;
  alt: string;
  className: string;
};

export const LazyImage = ({ src, alt, className }: Props) => {
  return (
    <LazyLoadImage src={src} alt={alt} className={className} effect="blur" />
  );
};

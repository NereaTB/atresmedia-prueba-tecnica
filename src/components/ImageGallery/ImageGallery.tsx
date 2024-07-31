import "./ImageGallery.scss";

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <section className="imageGallery">
      {images.map((image) => {
        return <img key={image} src={image} className="imageGallery__image"/>;
      })}
    </section>
  );
};

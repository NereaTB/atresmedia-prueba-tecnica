interface ImageGalleryProps {
    images: string[];
  }
  
  export const ImageGallery = ({ images }: ImageGalleryProps) => {
    return (
      <section>
        {images.map((image) => {
          return <img key={image} src={image} />;
        })}
      </section>
    );
  };
  
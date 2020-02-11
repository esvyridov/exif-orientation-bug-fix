import React, { useState } from "react";
import styles from "./ImageUploader.module.css";
import { getOrientation, getImageBase64, getCanvasBase64 } from "./helpers";

interface ImagePreviewProps {
  src: string;
}

const ImagePreview = ({ src }: ImagePreviewProps) => (
  <img className={styles.preview} src={src} alt="preview" />
);

const ImageUploader = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const onImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const orientation = await getOrientation(file);
      const imageBase64 = await getImageBase64(file);

      setImageSrc(await getCanvasBase64(orientation, imageBase64));
    }
  };
  return (
    <div className={styles.wrapper}>
      {imageSrc && <ImagePreview src={imageSrc} />}
      <input
        type="file"
        accept="image/png,image/jpeg"
        onChange={onImageUpload}
      />
    </div>
  );
};

export default ImageUploader;

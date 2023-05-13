import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextNormal from '@/components/common/Text/TextNormal';
import { updateProfile } from '@/stores/slices/profile/profileSlice';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

interface ViewVideoProps {
  url: string;
  onClose: () => void;
}

const ViewVideo = ({ url, onClose }: ViewVideoProps) => {
  const imageRef = useRef<HTMLDivElement>(null);

  const [loadLayout, setLoadLayout] = React.useState<boolean>(false);
  const [withHeight, setWithHeight] = React.useState<{
    width: string;
    height: string;
  }>({
    width: '100%',
    height: 'auto',
  });

  const handleImageLoad = () => {
    if (!imageRef.current) return;
    const width = imageRef.current.offsetWidth;
    setWithHeight({
      width: `${width}px`,
      height: `${(width * 9) / 16}px`,
    });
    setLoadLayout(true);
  };

  return (
    <div>
      <div className="my-14" ref={imageRef} onLoad={handleImageLoad}>
        <iframe
          style={{
            opacity: loadLayout ? 1 : 0,
          }}
          src={`https://www.youtube.com/embed/${url.split('?v=')[1]}`}
          width={withHeight.width}
          height={withHeight.height}
          frameBorder={0}
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
};

export default ViewVideo;

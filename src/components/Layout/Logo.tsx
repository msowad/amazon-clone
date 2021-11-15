import React from 'react';
import Image from 'next/image';
import { styled } from '@mui/system';

interface Props {
  large?: boolean;
}

const Logo: React.FC<Props> = ({ large }) => {
  return (
    <ImageContainer width={large ? 125 : 90} height={large ? 45 : 29}>
      <Image
        priority
        src='/amazon-light.png'
        alt='Amazon logo'
        layout='fill'
        objectFit='contain'
      />
    </ImageContainer>
  );
};

export default Logo;

const ImageContainer = styled('div')<{ width: number; height: number }>(
  ({ width, height }) => ({
    position: 'relative',
    width,
    height,
  })
);

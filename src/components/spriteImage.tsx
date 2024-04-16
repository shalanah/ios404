import React from 'react';
import spritesheet from '../../public/sprites/spritesheet.json';

const { rows, columns } = spritesheet.metadata;
type ImageKeys = Exclude<keyof typeof spritesheet, 'metadata'>;

export const SpriteImage = ({
  imageKey,
  name = null,
  width,
  height,
}: {
  imageKey: ImageKeys;
  name?: React.ReactNode;
  width: number;
  height: number;
}) => {
  // TODO: Backup image + loading state + error image?
  let [x, y] = spritesheet?.[imageKey] || [undefined, undefined];
  return (
    <div
      className="pos-center"
      style={{
        backgroundImage: 'url("/sprites/spritesheet.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${columns * width}px ${rows * height}px`,
        backgroundPosition: `${-Math.round(x * width)}px ${-Math.round(
          y * height
        )}px`,
        width: width,
        color: 'transparent',
        height: height,
      }}
    >
      {name}
    </div>
  );
};

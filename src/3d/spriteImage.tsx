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
  let [x, y] = spritesheet?.[imageKey] || [undefined, undefined];
  const isMissing = x === undefined || y === undefined;
  if (isMissing) {
    [x, y] = spritesheet['missing-image'] || [undefined, undefined];
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/sprites/spritesheet.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${columns * width}px ${rows * height}px`,
        backgroundPosition: `${-Math.round(x * width)}px ${-Math.round(
          y * height
        )}px`,
        width: width,
        height: height,
        opacity: 0.825,
        position: 'relative',
        borderRadius: 20,
      }}
    >
      <div
        style={{
          background: 'var(--vignette)',
          width,
          height,
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      />
      {isMissing && (
        <div
          style={{
            position: 'absolute',
            right: 15,
            top: 15,
            borderRadius: 20,
            fontSize: 22,
            background: '#000',
            color: '#fff',
            padding: '5px 25px',
            textTransform: 'uppercase',
            fontWeight: 700,
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          No image yet
        </div>
      )}
      {!isMissing && <div className="sr-only">{name}</div>}
    </div>
  );
};

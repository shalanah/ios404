import React from 'react';
import spritesheet from '../../public/sprites/spritesheet.json';

const { width: w, height: h, rows, columns } = spritesheet.metadata;

type ImageKeys = Exclude<keyof typeof spritesheet, 'metadata'>;

export const Image = ({
  imageKey,
  name,
  // style,
  width,
  height,
}: {
  imageKey: ImageKeys;
  name: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
}) => {
  // TODO: Backup image + loading state + error image? probably do a backup svg for good luck
  let [x, y] = spritesheet?.[imageKey] || [undefined, undefined];
  const isMissing = x === undefined || y === undefined;
  if (isMissing) {
    [x, y] = spritesheet['missing-image'] || [undefined, undefined];
  }

  return (
    <div style={{ width, height, position: 'relative' }}>
      <div
        style={{
          // position: 'relative',
          // overflow: 'hidden',
          backgroundImage: 'url("/sprites/spritesheet.jpg")',
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${columns * width}px ${rows * height}px`,
          backgroundPosition: `${-Math.round(x * width)}px ${-Math.round(
            y * height
          )}px`,
          width,
          height,
          position: 'absolute',
          left: 0,
          top: 0,
          opacity: 0.85,
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
            }}
          >
            No image yet
          </div>
        )}
      </div>
    </div>
  );
};

import {
  CheckCircle,
  MinusCircle,
  Question,
  XCircle,
} from '@phosphor-icons/react';
import { SupportType } from '@/utils/missingFeature';
import { supportColor } from '@/utils/constants';
import useMainContext from '@/hooks/useMainContext';

const Icons = ({ support }: { support: SupportType }) => {
  const iconsProps = {
    size: 42,
    style: {
      fill: 'currentColor',
      position: 'absolute',
      stroke: 'currentColor',
      color: 'inherit', // don't know why this doesn't inherit automatically
    },
    weight: 'regular',
  } as const;
  switch (support) {
    case 'a':
      return <MinusCircle {...iconsProps} />;
    case 'n':
      return <XCircle {...iconsProps} />;
    case 'y':
      return <CheckCircle {...iconsProps} />;
    default:
      return <Question {...iconsProps} />;
  }
};

const textOpts = {
  a: 'Partial',
  n: 'None',
  y: 'Found',
  unknown: 'Unknown',
} as const;

export const TextSupport = ({ support }: { support: SupportType }) => {
  return (
    <span style={{ color: supportColor[support] }}>
      {textOpts[support]}
      <span
        style={{
          position: 'relative',
          flexShrink: 0,
          width: 37,
          height: 30,
          marginLeft: 4,
          top: -1,
          display: 'inline-flex',
          borderRadius: '50%',
        }}
      >
        <Icons support={support} />
      </span>
    </span>
  );
};

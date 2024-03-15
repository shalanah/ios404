// @ts-nocheck

import { Html } from '@react-three/drei';
import useCanIUseContext from '../hooks/useCanIUseContext';
import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';
import * as THREE from 'three';

const rightHandWidth = 440;

const Div = styled.div`
  /* touch-action: none !important;
  pointer-events: none !important;
  * {
    touch-action: none !important;
  } */
  .description code {
    background: var(--codeBg);
    color: var(--codeColor);
    outline: 1px solid var(--codeBorder);
    font-size: 0.75em;
    padding: 0.1em 0.4em;
    border-radius: 0.4em;
    font-weight: bold;
  }
  .stats {
    width: ${rightHandWidth}px;
  }
  .stats > div {
    width: 100%;
    /* border-bottom: 2px solid currentColor; */
    display: flex;
    gap: 5px;
    align-items: baseline;
    justify-content: space-between;
    position: relative;
    padding: 13px 0px;
    :after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 4px;
      background: currentColor;
      width: 100%;
      opacity: 0.05;
    }
  }
  .stats h3 {
    font-size: 30px;
    width: 100px;
    flex-shrink: 0;
    font-weight: 500;
    opacity: 0.8;
  }
  .stats p {
    color: var(--titleColor);
    font-size: 30px;
    font-weight: 800;
  }
  a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
    border-radius: 15px;
    padding: 0px 15px;
    margin: 0px -15px;
    &:focus {
      outline: 5px dotted currentColor !important;
      outline-offset: 4px !important;
    }
  }
`;

const H1 = styled.h1`
  font-weight: bold;
  font-size: 236px;
  margin-left: -10px;
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: 0px;
  align-self: stretch;
`;

export const Text = ({
  position,
  index,
  rotation,
  bind, // assures that we can also swipe on <a> tags
}) => {
  const { iOSLacking, statuses } = useCanIUseContext();
  const {
    title,
    description,
    safariStat,
    firstSeen,
    spec,
    status,
    key,
    notes_by_num,
  } = iOSLacking[index];

  let date = firstSeen?.[1] ? new Date(firstSeen?.[1] * 1000) : '';
  date = date ? date.getFullYear() : '';
  const age = new Date().getFullYear() - date;
  return (
    <Html
      rotation={rotation}
      transform
      pointerEvents="none"
      position={position}
      scale={4}
      style={{
        width: 1000,
        touchAction: 'none',
        fontSmoothing: 'antialiased',
        height: 1150,
        pointerEvents: 'none',
      }}
      side={THREE.FrontSide} // Required
    >
      <Div {...bind()}>
        <div
          style={{
            position: 'absolute',
            overflow: 'visible',
            top: 30,
            fontSize: 38,
            lineHeight: '40px',
            width: 'calc(100% - 60px)',
            left: 30,
            height: 'calc(100% - 100px)',
            fontWeight: 'bold',
            textAlign: 'left',
            textTransform: 'uppercase',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <H1>Missing</H1>
          <div
            style={{
              display: 'flex',
              gap: 40,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 46,
                  marginBottom: 15,
                  textTransform: 'none',
                  lineHeight: 1.15,
                  fontWeight: 800,
                  textWrap: 'balance',
                }}
              >
                <a
                  onDragStart={(e) => e.preventDefault()}
                  href={`https://caniuse.com/${key}`}
                  target="_blank"
                  style={{ textDecoration: 'none' }}
                >
                  {title}
                  <ExternalLinkIcon
                    style={{
                      marginLeft: 8,
                      position: 'relative',
                      top: 6,
                      fontSize: 100,
                      width: 40,
                      height: 40,
                    }}
                  />
                </a>
              </h2>
              <div
                style={{
                  textAlign: 'left',
                  textTransform: 'none',
                  fontSize: 35,
                  lineHeight: 1.45,
                  marginBottom: 30,
                  fontWeight: 500,
                  textWrap: 'balance',
                }}
                className={'description'}
              >
                {Object.entries(notes_by_num).length > 0 && (
                  <ul
                    style={{
                      marginBottom: 15,
                      fontWeight: 700,
                      color: 'var(--partial)',
                    }}
                  >
                    {Object.entries(notes_by_num).map(([num, note]) => {
                      if (
                        !safariStat
                          .replaceAll(' ', '')
                          .replaceAll(/a|n|y/gi, '')
                          .split('#')
                          .includes(num)
                      )
                        return null;
                      return (
                        <li key={num}>
                          <Markdown>{note}</Markdown>
                        </li>
                      );
                    })}
                  </ul>
                )}
                <div style={{ height: 5 }} />
                <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                width: rightHandWidth,
                flexShrink: 0,
                alignItems: 'flex-start',
                // justifyContent: 'space-between',
                marginBottom: 20,
                marginTop: 'auto',
              }}
            >
              <div
                style={{
                  width: rightHandWidth,
                  flexShrink: 0,
                  background: '#000',
                  height: rightHandWidth,
                  display: 'flex',
                  position: 'relative',
                  borderRadius: 20,
                  overflow: 'hidden',
                }}
              >
                <Image
                  alt={'hey'}
                  src={`/imgs/${key}.png`}
                  width={rightHandWidth}
                  height={rightHandWidth}
                  style={{
                    objectFit: 'cover',
                    opacity: 0.85,
                    // mixBlendMode: 'luminosity',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    background: 'var(--vignette)',
                    width: rightHandWidth,
                    height: rightHandWidth,
                  }}
                />
              </div>
              <div
                style={{
                  minHeight: rightHandWidth,
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div className={'stats'}>
                  <div>
                    <h3>iOS&nbsp;Support</h3>
                    <p>
                      {safariStat.startsWith('a') || safariStat.startsWith('y')
                        ? 'Partial'
                        : 'None'}
                    </p>
                  </div>

                  <div>
                    <h3>Age </h3>
                    <p>
                      {age}
                      {age > 1 ? ' years' : ' year'}
                      {' ⋅ '} {date}
                    </p>
                  </div>
                  <div>
                    <h3>Parents</h3>
                    <p>
                      {firstSeen?.[0] || ''} {firstSeen?.[2] || ''}
                    </p>
                  </div>
                  <div>
                    <h3>Spec</h3>
                    <a
                      onDragStart={(e) => e.preventDefault()}
                      href={spec}
                      target="_blank"
                      style={{ textDecoration: 'none' }}
                    >
                      <p>
                        {statuses[status]
                          .replace('Candidate Recommendation', 'Candidate')
                          .replace('Proposed Recommendation', 'Proposed')
                          .replace('Recommendation', 'Rec')
                          .replace('Working Draft', 'Draft')
                          .replace('Living Standard', 'LS')}
                        <ExternalLinkIcon
                          style={{
                            lineHeight: 0,
                            width: 35,
                            height: 35,
                            marginLeft: 5,
                            position: 'relative',
                            top: 6,
                          }}
                        />
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Div>
    </Html>
  );
};

// @ts-nocheck

import { Html } from '@react-three/drei';
import useCanIUseContext from '../hooks/useCanIUseContext';
import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';

const Div = styled.div`
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
    width: 450px;
  }
  .stats > div {
    width: 100%;
    border-bottom: 1px solid currentColor;
    padding: 10px 0px;
    display: flex;
    gap: 5px;
    align-items: baseline;
    justify-content: space-between;
  }
  .stats h3 {
    font-size: 25px;
    text-transform: uppercase;
    width: 100px;
    flex-shrink: 0;
    font-weight: 400;
  }
  .stats p {
    color: var(--titleColor);
    font-size: 28px;
    font-weight: 700;
  }
`;

export const Text = ({ controls, index, rotation }) => {
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
      wrapperClass="wrapper"
      distanceFactor={10}
      position={controls.htmlPosition}
      occlude={'raycast'}
      // side={THREE.FrontSide} // Required
    >
      <Div
        style={{
          width: 1000,
          fontSmoothing: 'antialiased',
          height: 1150,
          pointerEvents: 'none',
          // scale: 4,
          transform: 'scale(4) translateZ(0)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
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
          <h1
            style={{
              fontWeight: 'bold',
              fontSize: 236,
              marginLeft: -10,
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: 10,
              alignSelf: 'stretch',
            }}
          >
            Missing
          </h1>
          <div
            style={{
              display: 'flex',
              gap: 20,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 42,
                  marginBottom: 15,
                  textTransform: 'none',
                  lineHeight: 1.15,
                  fontWeight: 800,
                  textWrap: 'balance',
                }}
              >
                <a href={`https://caniuse.com/${key}`} target="_blank">
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
                  fontSize: 36,
                  lineHeight: 1.25,
                  marginBottom: 30,
                  fontWeight: 500,
                  textWrap: 'balance',
                }}
                className={'description'}
              >
                {Object.entries(notes_by_num).length > 0 && (
                  <ul style={{ marginBottom: 15, fontWeight: 700 }}>
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
                <Markdown remarkPlugins={[remarkGfm]}>{description}</Markdown>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                width: 450,
                flexShrink: 0,
                alignItems: 'flex-start',
                // justifyContent: 'space-between',
                marginBottom: 20,
                marginTop: 'auto',
              }}
            >
              <div
                style={{
                  width: 450,
                  flexShrink: 0,
                  background: '#000',
                  height: 450,
                  display: 'flex',
                  position: 'relative',
                  borderRadius: 20,
                  overflow: 'hidden',
                }}
              >
                <Image
                  alt={'hey'}
                  src={`/imgs/${key}.png`}
                  width={450}
                  height={450}
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
                    width: 450,
                    height: 450,
                  }}
                />
              </div>
              <div
                style={{
                  minHeight: 450,
                  textTransform: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <div className={'stats'}>
                  <div>
                    <h3>Support</h3>
                    <p>
                      {safariStat.startsWith('a') || safariStat.startsWith('y')
                        ? 'Partial'
                        : 'None'}
                    </p>
                  </div>
                  <div>
                    <h3>Age </h3>
                    <p>
                      <span
                        style={{
                          fontWeight: 300,
                          marginRight: 10,
                        }}
                      >
                        ({date})
                      </span>{' '}
                      {age} yr
                      {age > 1 ? 's' : ''} old
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
                    <a href={spec} target="_blank">
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
        <div
          style={{
            position: 'absolute',
            bottom: 25,
            fontSize: 30,
            lineHeight: '40px',
            width: 'calc(100% - 60px)',
            left: 30,
            textAlign: 'left',
          }}
        >
          Contact{' '}
          <a
            href={`https://caniuse.com/${key}`}
            target="_blank"
            style={{
              textDecoration: 'underline',
              textUnderlineOffset: 5,
            }}
          >
            caniuse.com
          </a>{' '}
          if you have any information regarding this feature.
        </div>
      </Div>
    </Html>
  );
};

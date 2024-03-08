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
    background: rgba(255, 255, 255, 0.3);
    font-size: 0.75em;
    padding: 0.1em 0.4em;
    border-radius: 0.4em;
  }
  .stats {
    font-size: 50px;
    line-height: 1.1;
  }
  .stats > div {
    margin: 0px 0 20px;
    display: flex;
    gap: 20px;
  }
  .stats h3 {
    text-align: right;
    padding-top: 7.5px;
    width: 100px;
    flex-shrink: 0;
    opacity: 0.5;
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  .stats p {
    font-size: 34px;
    font-weight: 600;
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
          <div
            style={{
              fontSize: 236,
              marginLeft: -10,
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: 10,
              alignSelf: 'stretch',
              // textAlign: 'center',
            }}
          >
            Missing
          </div>
          <div
            style={{
              display: 'flex',
              gap: 20,
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 42,
                  marginBottom: 15,
                  textTransform: 'none',
                  lineHeight: 1.15,
                  fontWeight: 800,
                  textWrap: 'balance',
                }}
              >
                {title}
                <a
                  href={`https://caniuse.com/${key}`}
                  target="_blank"
                  style={{ pointerEvents: 'all' }}
                >
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
              </div>
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
                gap: 20,
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
                  outline: '1px solid red',
                }}
              >
                <Image
                  alt={'hey'}
                  src={`/imgs/${key}.png`}
                  width={450}
                  height={450}
                  style={{
                    objectFit: 'cover',
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
                  outline: '1px solid black',
                }}
              >
                <div className={'stats'}>
                  <div>
                    {/* <h3>Support</h3> */}
                    <p>
                      {safariStat.startsWith('a') || safariStat.startsWith('y')
                        ? 'Partially supported'
                        : 'No support'}
                    </p>
                  </div>
                  <div>
                    {/* <h3>Age </h3> */}
                    <p>
                      {age} yr{age > 1 ? 's' : ''} old ({date})
                    </p>
                  </div>
                  <div>
                    {/* <h3>Parents</h3> */}
                    <p>
                      {firstSeen?.[0] || ''} {firstSeen?.[2] || ''} (First seen)
                    </p>
                  </div>
                  <div>
                    {/* <h3>Spec</h3> */}
                    <p>
                      {statuses[status]}
                      <a
                        href={spec}
                        target="_blank"
                        style={{
                          marginLeft: 15,
                          position: 'relative',
                          top: 5,
                          pointerEvents: 'all',
                        }}
                      >
                        <ExternalLinkIcon style={{ width: 35, height: 35 }} />
                      </a>
                    </p>
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
            fontWeight: 'bold',
            textAlign: 'left',
            // textTransform: 'uppercase',
          }}
        >
          Contact caniuse if you have any information regarding this feature.
        </div>
      </Div>
    </Html>
  );
};

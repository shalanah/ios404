// @ts-nocheck

import { Html } from '@react-three/drei';
import useCanIUseContext from '../hooks/useCanIUseContext';
import Image from 'next/image';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './text.module.css';
import { ExternalLinkIcon } from '@radix-ui/react-icons';

export const Text = ({ controls, index }) => {
  const { iOSLacking, statuses } = useCanIUseContext();
  if (iOSLacking.length === 0) return null;
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
      transform
      wrapperClass="wrapper"
      distanceFactor={10}
      position={controls.htmlPosition}
      occlude={'raycast'}
      // side={THREE.FrontSide} // Required
    >
      <div
        style={{
          width: 1000,
          pointerEvents: 'none',
          fontSmoothing: 'antialiased',
          height: 1150,
          scale: 4,
          position: 'relative',
        }}
      >
        {/* <svg viewBox="0 0 4000 4600">
          <rect
            x="200"
            y="200"
            width="3600"
            height="4200"
            fill={'transparent'}
            strokeWidth={80}
            stroke={'#000'}
          />
        </svg> */}
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
              fontSize: 225,
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
                  // textAlign: 'center',
                  fontSize: 42,
                  marginBottom: 15,
                  textTransform: 'none',
                  lineHeight: 1.15,
                  fontWeight: 800,
                  textWrap: 'balance',
                  display: 'flex',
                  alignItems: 'baseline',
                }}
              >
                <span>{title}</span>
                {/* <a
                  href={`https://caniuse.com/${key}`}
                  target="_blank"
                  style={{ pointerEvents: 'all' }}
                >
                  <ExternalLinkIcon
                    style={{
                      position: 'relative',
                      top: 6,
                      fontSize: 100,
                      width: 50,
                      height: 50,
                    }}
                  />
                </a> */}
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
                className={styles.description}
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
                <div className={styles.stats}>
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
      </div>
    </Html>
  );
};

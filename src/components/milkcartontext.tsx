import { Html } from '@react-three/drei';
import useCanIUseContext from '../hooks/useCanIUseContext';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLinkIcon } from '@radix-ui/react-icons';
import styled from 'styled-components';
import { visit } from 'unist-util-visit';
import { SpriteImage } from './spriteImage';
import useDarkMode from '@/hooks/useDarkMode';
import { CSSProperties } from 'react';

const rightHandWidth = 450;

function addCanIUseUrlBack() {
  return (tree: any) => {
    visit(tree, 'link', (node) => {
      if (node.url.startsWith('/')) {
        node.url = `https://caniuse.com${node.url}`;
      }
    });
  };
}
const getSupportText = (str: string) => {
  switch (str.charAt(0).toLowerCase()) {
    case 'a':
      return 'Partial';
    case 'n':
      return 'No Support';
    case 'y':
      return 'Supported';
    default:
      console.error('Unknown support type:', str);
      return 'Unknown';
  }
};

const getShortSpecName = (str: string) => {
  return str
    .replace('Candidate Recommendation', 'Candidate')
    .replace('Proposed Recommendation', 'Proposed')
    .replace('Recommendation', 'Rec')
    .replace('Working Draft', 'Draft')
    .replace(' Living Standard', '');
};

const Container = styled.div`
  touch-action: none;
  position: absolute;
  top: 0px;
  font-size: 38px;
  line-height: 40px;
  left: 30px;
  width: calc(100% - 60px);
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  text-align: left;
  * {
    touch-action: none;
  }
  a {
    text-decoration: none;
    border-radius: 15px;
    padding: 0px 15px;
    margin: 0px -15px;
    &:hover {
      transform: scale(1);
    }
    &:focus {
      outline: 5px dotted currentColor !important;
      outline-offset: 4px !important;
    }
  }
`;

const Feature = styled.div`
  font-size: 35px;
  line-height: 1.35;
  margin-bottom: 30px;
  font-weight: 500;
  text-wrap: balance;
  a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  @media (max-width: 768px) {
    font-weight: 700;
    font-size: 36px;
  }
  code {
    font-family: monospace;
    background: var(--codeBg);
    color: var(--codeColor);
    font-size: 0.75em;
    padding: 0.1em 0.4em;
    border-radius: 0.4em;
    font-weight: bold;
  }
`;
const Description = styled.div`
  @media (max-width: 768px) {
    opacity: 0.8;
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

const H2 = styled.h2`
  font-size: 44px;
  margin-bottom: 15px;
  line-height: 1.15;
  font-weight: 800;
  text-wrap: balance;
`;

const Cols = styled.div`
  display: flex;
  gap: 25px;
  justify-content: space-between;
`;
const Col1 = styled.div``;
const Col2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5;
  width: ${rightHandWidth}px;
  flex-shrink: 0;
  align-items: flex-start;
  margin-bottom: 20px;
  margin-top: auto;
`;

const Ul = styled.ul`
  margin-bottom: 15px;
  font-weight: 700;
`;

const Badge = styled.div`
  flex-shrink: 0;
  width: ${rightHandWidth}px;
  height: ${rightHandWidth}px;
  position: relative;
`;

const Stats = styled.div`
  width: ${rightHandWidth}px;
  font-size: 29px;
  margin-top: 30px;
  @media (max-width: 768px) {
    font-size: 32px;
  }
  div {
    width: 100%;
    /* border-bottom: 2px solid currentColor; */
    display: flex;
    gap: 5px;
    align-items: baseline;
    justify-content: space-between;
    position: relative;
    padding: 13px 0px;
    &:not(:last-child):after {
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
  h3 {
    white-space: nowrap;
    font-size: inherit;
    width: 100px;
    flex-shrink: 0;
    font-weight: 800;
    opacity: 0.8;
    color: var(--titleFg);
    @media (max-width: 768px) {
      font-weight: 800;
      opacity: 0.6;
    }
  }
  p {
    font-weight: 500;
  }
`;

const externalLinkStyle: CSSProperties = {
  lineHeight: 0,
  width: 35,
  height: 35,
  marginLeft: 5,
  position: 'relative',
  top: 6.5,
};

const getSupportColor = (support: string, type: string = 'note') => {
  switch (support.slice(0, 1).toLowerCase()) {
    case 'n':
      return `var(--${type}No)`;
    case 'a':
      return `var(--${type}Partial)`;
    case 'y':
    default:
      return `var(--${type}Y, green)`;
  }
};

export const MilkCartonText = ({
  position,
  index,
  rotation,
  bind, // assures that we can also swipe on <a> tags - mostly for mouse and not touch screens
}: {
  position: [number, number, number];
  index: number;
  rotation: [number, number, number];
  bind?: any;
}) => {
  const { iOSMissingFeatures, statuses } = useCanIUseContext();
  const { isDarkMode } = useDarkMode();
  const {
    title,
    description,
    iOSWebkitStat,
    firstSeen, // TODO: Type this better ...  use object over array?
    spec,
    key,
    status,
    notes_by_num,
    desktopSafariStat,
  } = iOSMissingFeatures[index];

  let [firstSeenBrowser = '', dateSupported = '0', firstSeenVersion = ''] =
    firstSeen;

  const iosMacSame =
    iOSWebkitStat.slice(0, 1) === desktopSafariStat.slice(0, 1);
  const firstSeenDate: number = Number(dateSupported);
  const date = new Date(firstSeenDate * 1000).getFullYear();
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
        fontSmooth: 'antialiased',
        height: 1150,
        pointerEvents: 'none',
      }}
    >
      <Container {...(bind ? bind() : {})}>
        <H1>Missing</H1>
        <Cols>
          <Col1>
            <H2>
              <a
                onDragStart={(e) => e.preventDefault()} // TODO: Maybe... put this on a listener on the container instead? --- would also help with the nested links in the description
                href={`https://caniuse.com/${key}`}
                target="_blank"
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
            </H2>
            <Feature>
              {/* Feature Notes */}
              {Object.entries(notes_by_num).length > 0 && (
                <Ul
                  key={iOSWebkitStat.startsWith('a') ? 'a' : 'no'}
                  style={{
                    background: getSupportColor(iOSWebkitStat, 'note'),
                    color: 'transparent',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                  }}
                >
                  {Object.entries(notes_by_num).map(([num, note]) => {
                    if (
                      !iOSWebkitStat
                        .replaceAll(' ', '')
                        .replaceAll(/a|n|y/gi, '')
                        .split('#')
                        .includes(num)
                    )
                      return null;
                    return (
                      <li key={num}>
                        <Markdown
                          remarkPlugins={[remarkGfm, addCanIUseUrlBack]}
                        >
                          {note}
                        </Markdown>
                      </li>
                    );
                  })}
                </Ul>
              )}
              <Description>
                <Markdown remarkPlugins={[remarkGfm, addCanIUseUrlBack]}>
                  {description}
                </Markdown>
              </Description>
            </Feature>
          </Col1>
          {/* Col 2 */}
          <Col2>
            <Badge>
              <SpriteImage
                // TODO: alt text - support type
                name={'text'}
                imageKey={`${isDarkMode ? 'dark' : 'light'}-${
                  iOSWebkitStat.startsWith('a') ? 'partial' : 'no'
                }`}
                // Want a bit of an oversized circle
                width={rightHandWidth + 45}
                height={rightHandWidth + 45}
              />
              <SpriteImage
                // TODO: alt text - data source
                name={'text2'}
                imageKey={`${isDarkMode ? 'dark' : 'light'}-ciu`}
                // Want a bit of an oversized circle
                width={rightHandWidth + 45}
                height={rightHandWidth + 45}
              />
            </Badge>
            <Stats>
              <div>
                <h3>{iosMacSame ? 'iOS / Mac Safari' : 'iOS'}</h3>
                <p
                  style={{
                    color: getSupportColor(iOSWebkitStat, 'spec'),
                  }}
                >
                  {getSupportText(iOSWebkitStat)}
                </p>
              </div>
              {!iosMacSame && (
                <div>
                  <h3>Mac Safari</h3>
                  <p
                    style={{
                      color: getSupportColor(desktopSafariStat, 'spec'),
                    }}
                  >
                    {getSupportText(desktopSafariStat)}
                  </p>
                </div>
              )}
              <div>
                <h3>Age</h3>
                <p>
                  {age}
                  {age === 1 ? ' year' : ' years'} <span>({date})</span>
                </p>
              </div>
              <div>
                <h3>First found</h3>
                <p>
                  {firstSeenBrowser.replace(
                    'Chrome for Android',
                    'Chrome Android'
                  )}{' '}
                  {firstSeenVersion}
                </p>
              </div>
              <div>
                <h3>Spec</h3>
                <a
                  onDragStart={(e) => e.preventDefault()}
                  href={spec}
                  target="_blank"
                >
                  <p>
                    {getShortSpecName(statuses ? statuses[status] : '')}
                    <ExternalLinkIcon style={externalLinkStyle} />
                  </p>
                </a>
              </div>
              <div>
                <h3>Data</h3>
                <a
                  onDragStart={(e) => e.preventDefault()}
                  href={`https://caniuse.com/${key}`}
                  target="_blank"
                >
                  <p>
                    {'Caniuse'}
                    <ExternalLinkIcon style={externalLinkStyle} />
                  </p>
                </a>
              </div>
            </Stats>
          </Col2>
        </Cols>
      </Container>
    </Html>
  );
};

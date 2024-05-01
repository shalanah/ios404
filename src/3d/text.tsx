import useMainContext from '../hooks/useMainContext';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import { visit } from 'unist-util-visit';
import { SpriteImage } from './spriteImage';
import {
  Check,
  Copy,
  CursorText,
  Flask,
  HandSwipeRight,
  Highlighter,
} from '@phosphor-icons/react';
import { TextStats } from './textStats';
import {
  supportColor,
  rightHandWidth,
  grabIgnoreClass,
  dataTooltipIdProps,
} from '@/utils/constants';
import { getOnCopy } from '@/utils/getCopyText';
import { useWindowSize } from '@uidotdev/usehooks';
import { CSSProperties, useEffect, useState, useRef } from 'react';
import useDarkMode from '@/hooks/useDarkMode';
import { Html } from './htmlWithContext';

function addCanIUseUrlBack() {
  return (tree: any) => {
    visit(tree, 'link', (node) => {
      if (node.url.startsWith('/')) {
        node.url = `https://caniuse.com${node.url}`;
      }
    });
  };
}
function addMdnUrlBack() {
  return (tree: any) => {
    visit(tree, 'link', (node) => {
      if (node.url.startsWith('/')) {
        node.url = `https://developer.mozilla.org${node.url}`;
      }
    });
  };
}

const Container = styled.section`
  touch-action: none !important;
  position: absolute;
  top: 3px;
  left: 30px;
  width: calc(100% - 60px);
  height: calc(100% - 50px);
  display: flex;
  flex-direction: column;
  text-align: left;
  -webkit-user-drag: none;
  word-break: break-word;
  * {
    -webkit-user-drag: none !important;
    touch-action: none !important;
  }
  a,
  .round {
    text-decoration: none;
    border-radius: 15px;
    padding: 0px 15px;
    margin: 0px -15px;
  }
  button,
  a {
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
  font-size: 30px;
  line-height: 1.7;
  font-weight: 400;
  text-wrap: balance;
  li {
    line-height: 1.4;
  }
  a {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  @media (max-width: 768px) {
    font-weight: 700;
    line-height: 1.4;
  }
  code {
    font-family: monospace;
    background: var(--codeBg);
    color: var(--codeFg);
    font-size: 0.75em;
    padding: 0.1em 0.4em;
    border-radius: 0.4em;
    font-weight: bold;
  }
`;
const Description = styled.div`
  @media (max-width: 768px) {
    opacity: 0.9;
  }
`;

const H1 = styled.h1`
  white-space: nowrap !important;
  font-weight: bold;
  font-size: 236px;
  margin-left: -10px;
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: 0px;
  align-self: stretch;
  color: var(--titleFg);
  pointer-events: none !important;
  user-select: none !important;
  margin-bottom: -6px;
`;

const H2 = styled.h2`
  font-size: 36px;
  margin-bottom: 15px;
  line-height: 1.15;
  font-weight: 800;
  text-wrap: balance;
  color: var(--titleFg);
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
  width: ${rightHandWidth}px;
  flex-shrink: 0;
  align-items: flex-start;
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

const Interaction = styled.div`
  margin-right: 40px;
  flex-shrink: 0px;
  margin-top: 30px;
  font-size: 28px;
  gap: 3px;
  span {
    display: flex;
  }
  .check {
    overflow: visible;
    path {
      stroke: currentColor;
      stroke-width: 2px;
      vector-effect: non-scaling-stroke;
    }
  }
  button {
    position: relative;
    -webkit-user-drag: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 8px;
    cursor: pointer;
    color: var(--fg);
    svg {
      vector-effect: non-scaling-stroke;
      color: inherit;
      path {
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 4px;
        stroke: currentColor;
      }
    }
  }
`;

export const Text = ({
  position,
  rotation,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
}) => {
  const {
    missingFeatures,
    activeIndex: index,
    statuses,
    cartonInteractionMode,
    setCartonInteractionMode,
  } = useMainContext();
  const missingFeature = missingFeatures[index];
  const {
    title,
    description,
    iOSWebkitStat,
    source,
    id,
    experimental,
    notes = [],
  } = missingFeature;
  const { isDarkMode } = useDarkMode();

  const { width } = useWindowSize();
  const actionSize = width && width < 500 ? 100 : 70; // actually want bigger on mobile
  const actionGap = 5;
  const actionIcon = Math.round(actionSize * 0.7);
  const buttonStyle: CSSProperties = {
    width: actionSize,
    height: actionSize,
    position: 'relative',
  };
  const iconStyle: CSSProperties = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const [copyNum, setCopyNum] = useState(0);
  const [showCheck, setShowCheck] = useState(false);
  useEffect(() => {
    if (copyNum > 0) {
      setShowCheck(true);
      const timer = setTimeout(() => {
        setShowCheck(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copyNum]);
  const onCopy = () => {
    getOnCopy(missingFeature, statuses)();
    setCopyNum((v) => v + 1);
  };

  const ref = useRef<HTMLDivElement>(null);
  const onHighlighter = () => {
    if (ref.current) {
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(ref.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    setCartonInteractionMode('text');
  };

  return (
    // @ts-ignore
    <Html
      rotation={rotation}
      transform
      pointerEvents={'auto'}
      position={position}
      className={`${
        cartonInteractionMode === 'text' ? 'pointer-all' : 'user-select-none'
      } ${grabIgnoreClass}`}
      scale={4}
      style={{
        width: 1000,
        fontSmooth: 'antialiased',
        height: 1150,
      }}
    >
      <Container style={{ userSelect: 'none' }}>
        <H1 translate="no">Missing</H1>
        <Cols className="carton-text" ref={ref}>
          <Col1 className="d-flex flex-column">
            <div
              key={index}
              className="selectable-text"
              style={{
                maxHeight: width && width < 500 ? 755 : 780, //  icons bigger on mobile
                overflow: 'auto',
                overscrollBehavior: 'contain',
              }}
            >
              <H2
                translate="no"
                style={{ paddingRight: experimental ? '1em' : '' }}
              >
                {title}
                {experimental && (
                  <span
                    style={{
                      left: '.1em',
                      position: 'relative',
                      width: 0,
                      display: 'inline-block',
                      top: '.1em',
                    }}
                  >
                    <Flask
                      weight="bold"
                      fill={'currentColor'}
                      style={{
                        stroke: 'currentColor',
                        strokeWidth: 6,
                        vectorEffect: 'non-scaling-stroke',
                      }}
                    />
                    <span className="sr-only">Experimental</span>
                  </span>
                )}
              </H2>
              <Feature style={{ marginTop: 15 }}>
                {notes.length > 0 && (
                  <Ul
                    style={{
                      // @ts-ignore
                      color: supportColor[iOSWebkitStat],
                    }}
                  >
                    {(notes as string[]).map((note, i) => {
                      if (source === 'mdn' && note) {
                        return (
                          <li
                            key={`${i}-${index}`}
                            dangerouslySetInnerHTML={{ __html: note }}
                          />
                        );
                      }
                      return (
                        <li key={`${i}-${index}`}>
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
                  <Markdown
                    remarkPlugins={[
                      remarkGfm,
                      source === 'mdn' ? addMdnUrlBack : addCanIUseUrlBack,
                    ]}
                  >
                    {description}
                  </Markdown>
                </Description>
              </Feature>
            </div>
            <Interaction className="d-flex flex-column">
              <span
                style={{
                  boxSizing: 'border-box',
                  position: 'relative',
                  gap: actionGap,
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: actionSize,
                    height: actionSize,
                    opacity: 0.8,
                    background: 'var(--codeBg)',
                    zIndex: -1,
                    borderRadius: '12px',
                    transition: 'transform 0.15s ease-in-out',
                    transform:
                      cartonInteractionMode === 'grab'
                        ? 'translate(0px, 0px)'
                        : `translate(${actionSize + actionGap}px, 0px)`,
                  }}
                />
                <button
                  style={buttonStyle}
                  {...dataTooltipIdProps}
                  data-tooltip-content="Swipe mode"
                  className={cartonInteractionMode === 'grab' ? 'active' : ''}
                  onClick={() => {
                    const selection = window.getSelection();
                    if (selection) {
                      selection.removeAllRanges();
                    }
                    setCartonInteractionMode('grab');
                  }}
                >
                  <HandSwipeRight size={actionIcon} style={iconStyle} />
                  <span className="sr-only">Swipe mode</span>
                </button>
                <button
                  style={buttonStyle}
                  {...dataTooltipIdProps}
                  data-tooltip-content="Text mode"
                  className={cartonInteractionMode === 'text' ? 'active' : ''}
                  onClick={() => setCartonInteractionMode('text')}
                >
                  <CursorText size={actionIcon} style={iconStyle} />
                  <span className="sr-only">Text mode</span>
                </button>
                <button
                  style={buttonStyle}
                  {...dataTooltipIdProps}
                  data-tooltip-content="Copy all feature info"
                  onClick={onCopy}
                >
                  <Copy
                    size={actionIcon}
                    style={{
                      ...iconStyle,
                      opacity: showCheck ? 0.3 : 1,
                      transition: '.2s',
                    }}
                  />
                  <span
                    style={{
                      height: 34,
                      width: 34,
                      color: isDarkMode ? '#000' : '#e2ddca',
                      background: 'var(--specY)',
                      borderRadius: '50%',
                      fill: 'currentColor',
                      transition: '.2s ease-in',
                      opacity: showCheck ? 1 : 0,
                      position: 'absolute',
                      right: -5,
                      top: 0,
                      transform: showCheck ? '' : 'translateY(5px)',
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Check
                      size={18}
                      weight="bold"
                      className="check"
                      fill={'currentColor'}
                    />
                  </span>
                  <span className="sr-only">
                    Copy feature text to clipboard
                  </span>
                </button>
                <button
                  style={buttonStyle}
                  {...dataTooltipIdProps}
                  data-tooltip-content="Select all text"
                  onClick={onHighlighter}
                >
                  <Highlighter size={actionIcon} style={iconStyle} />
                  <span className="sr-only">Select all text</span>
                </button>
              </span>
            </Interaction>
          </Col1>
          <Col2>
            <Badge>
              <SpriteImage
                name={`Cartoonish image of a kid representing the missing feature ${title}`}
                // @ts-ignore
                imageKey={id}
                width={rightHandWidth}
                height={rightHandWidth}
              />
            </Badge>
            <TextStats />
          </Col2>
        </Cols>
      </Container>
    </Html>
  );
};

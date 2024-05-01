import useMainContext from '../hooks/useMainContext';
import styled from 'styled-components';
import FeaturesEmpty from './featuresEmpty';
import { useArrowKeysFeatureProgression } from '@/hooks/useArrowKeysFeatureProgression';
import { useScrollToActiveFeatureOnLoad } from '@/hooks/useScrollToActiveFeatureOnLoad';
import { Flask } from '@phosphor-icons/react';
import { buttonClass, dataTooltipIdProps } from '@/utils/constants';

const Button = styled.button`
  display: flex;
  gap: 8px;
  width: calc(100% + 8px);
  padding: 0.45em 3ch 0.45em 0.5em;
  margin: 0 -4px;
  outline: 2px dotted transparent;
  transition: 0.3s;
  border-radius: 10px;
  margin-bottom: 2px;
  font-size: 1.15rem;
  line-height: 1.2;
  transition: 0.1s color ease-out;
  font-weight: 200;
  word-break: break-word;
  color: var(--fg);
  &:hover,
  &:focus,
  &:active {
    transform: scale(1);
  }
  &:hover {
    color: var(--titleFg);
  }
  &:focus,
  &:focus-visible {
    outline: 2px dotted currentColor;
  }
  @media (max-width: 768px) {
    font-weight: 500;
    padding: 0.4em 0.5em;
    color: color-mix(in srgb, var(--fg), transparent 40%);
  }
  &.active {
    font-weight: 700;
    color: var(--titleFg) !important;
  }
`;

const Dot = styled.span`
  width: 5px;
  height: 5px;
  margin-top: 0.42em;
  color: var(--dotNo);
  background: currentColor;
  flex-shrink: 0;
  border-radius: 50%;
  margin-left: 1px;
  bottom: 0.45em;
  display: inline-block;
  position: relative;
`;

export default function Features() {
  const { activeIndex, updateHash, filteredData, activeInFilteredData } =
    useMainContext();
  useScrollToActiveFeatureOnLoad();
  useArrowKeysFeatureProgression();
  return (
    <div>
      <FeaturesEmpty />
      {filteredData.map(
        ({ id, index, experimental, iOSWebkitStat, ...v }, i) => {
          const active = index === activeIndex;
          return (
            <Button
              tabIndex={active || (!activeInFilteredData && i === 0) ? 0 : -1}
              key={id}
              data-active={active ? 'true' : 'false'}
              data-index={index} // to focus on load
              className={buttonClass + (active ? ' active' : '')}
              onClick={(e) => {
                updateHash(id, 'button');
                // Safari doesn't think buttons deserve focus... 🤷‍♀️?
                // - https://stackoverflow.com/questions/42758815/safari-focus-event-doesnt-work-on-button-element
                e.currentTarget.focus();
              }}
            >
              <span>
                {v.title}&nbsp;
                {iOSWebkitStat === 'a' && (
                  <Dot
                    {...dataTooltipIdProps}
                    data-tooltip-content="Partial support"
                    style={{
                      color: 'var(--dotPartial)',
                    }}
                  />
                )}
                {experimental && (
                  <span
                    style={{
                      position: 'relative',
                      top: active ? '.115em' : '.14em',
                      left: active ? '.165em' : '.125em',
                      width: 0,
                      display: 'inline-block',
                    }}
                  >
                    <span className="sr-only">Experimental</span>
                    <Flask
                      color={'currentColor'}
                      weight={active ? 'bold' : 'regular'}
                      style={{
                        opacity: active ? 1 : 0.75,
                        ...(active
                          ? {
                              stroke: 'currentColor',
                              strokeWidth: 5,
                              vectorEffect: 'non-scaling-stroke',
                            }
                          : {}),
                      }}
                    />
                  </span>
                )}
              </span>
            </Button>
          );
        }
      )}
    </div>
  );
}

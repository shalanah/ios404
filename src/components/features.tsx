import useCanIUseContext from '../hooks/useCanIUseContext';
import { buttonClass } from '../hooks/useCanIUseContext';
import styled from 'styled-components';
import FeaturesEmpty from './featuresEmpty';
import { useArrowKeysFeatureProgression } from '@/hooks/useArrowKeysFeatureProgression';
import { useScrollToActiveFeatureOnLoad } from '@/hooks/useScrollToActiveFeatureOnLoad';

const Button = styled.button`
  display: flex;
  gap: 10px;
  width: calc(100% + 8px);
  padding: 0.45em 0.5em;
  margin: 0 -4px;
  outline: 2px dotted transparent;
  transition: 0.3s;
  border-radius: 10px;
  margin-bottom: 2px;
  font-size: 1.15rem;
  line-height: 1.2;
  transition: 0.1s color ease-out;
  font-weight: 200;
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
    font-weight: 400;
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
  margin-left: 5px;
`;

export default function Features() {
  const { activeIndex, updateHash, filteredData, activeInFilteredData } =
    useCanIUseContext();
  useScrollToActiveFeatureOnLoad();
  useArrowKeysFeatureProgression();
  return (
    <div>
      <FeaturesEmpty />
      {filteredData.map(({ key, index, iOSWebkitStat, ...v }, i) => {
        const active = index === activeIndex;
        return (
          <Button
            tabIndex={active || (!activeInFilteredData && i === 0) ? 0 : -1}
            key={key}
            data-active={active ? 'true' : 'false'}
            data-index={index} // to focus on load
            className={buttonClass + (active ? ' active' : '')}
            onClick={(e) => {
              updateHash(key, 'button');
              // Safari doesn't think buttons deserve focus... 🤷‍♀️?
              // - https://stackoverflow.com/questions/42758815/safari-focus-event-doesnt-work-on-button-element
              e.currentTarget.focus();
            }}
          >
            <Dot
              style={{
                color: iOSWebkitStat.startsWith('a')
                  ? 'var(--dotPartial)'
                  : 'var(--dotNo)',
              }}
            />
            {v.title}
          </Button>
        );
      })}
    </div>
  );
}

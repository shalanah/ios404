import styled from 'styled-components';
import { sources, rightHandWidth } from '@/utils/constants';
import { TextSupport } from './textSupport';
import { ArrowUpRight, CaretDown, Flask } from '@phosphor-icons/react';
import { getMissingDate } from '@/utils/getFeatureStats';
import { FilterModal } from '@/modals/filterModal';
import { FilterSources } from '@/modals/filterSources';
import useMainContext from '@/hooks/useMainContext';
import { FilterExperimental } from '@/modals/filterExperimental';

const getShortSpecName = (str: string) => {
  return str
    .replace('Candidate Recommendation', 'Candidate')
    .replace('Proposed Recommendation', 'Proposed')
    .replace('Recommendation', 'Rec')
    .replace('Working Draft', 'Draft')
    .replace(' Living Standard', '');
};

const Stats = styled.dl`
  width: ${rightHandWidth}px;
  font-size: 30px;
  margin-top: 0px;
  div {
    width: 100%;
    display: flex;
    gap: 5px;
    align-items: baseline;
    justify-content: space-between;
    position: relative;
    padding: 10.5px 0px;
    &:not(:last-child):after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      bottom: 0;
      border-top: 3px solid var(--cartonBd);
      width: 100%;
      /* opacity: 0.3; */
      /* @media (max-width: 768px) {
        border-top: none;
      } */
    }
  }
  dl {
    white-space: nowrap;
    font-size: inherit;
    font-weight: 700;
    color: var(--titleFg);
    @media (max-width: 768px) {
      font-weight: 800;
    }
  }
  dt {
    font-weight: 400;
    svg {
      color: inherit;
    }
    @media (max-width: 768px) {
      font-weight: 800;
    }
  }
`;

export const TextStats = () => {
  const { activeIndex, missingFeatures, statuses } = useMainContext();
  const {
    iOSWebkitStat,
    firstSeen, // TODO: Type this better ...  use object over array?
    specUrl,
    specKey,
    browsers,
    experimental,
    source,
    sourceUrl,
  } = missingFeatures[activeIndex];

  let [firstSeenBrowser = '', dateSupported, firstSeenVersion = ''] = firstSeen;
  const iosMacSame = iOSWebkitStat === browsers.safari.support;
  const { year, age } = getMissingDate(dateSupported);

  const items = [
    {
      term: iosMacSame ? 'iOS/Mac Safari' : 'iOS',
      det: <TextSupport support={iOSWebkitStat} />,
    },
    ...(!iosMacSame
      ? [
          {
            term: 'Mac Safari',
            det: <TextSupport support={browsers.safari.support} />,
          },
        ]
      : []),
    {
      term: 'Missing',
      det: (
        <>
          {age} <span>({year})</span>
        </>
      ),
    },
    {
      term: 'Parents',
      det: (
        <>
          {firstSeenBrowser.replace('for Android', 'Android')}{' '}
          {firstSeenVersion}
        </>
      ),
    },
    ...(source === 'mdn'
      ? [
          {
            term: (
              <>
                <span className="sr-only">Experimental</span>
                <FilterModal
                  button={
                    <button className={'round'}>
                      Experimental <CaretDown size={25} weight="bold" />
                    </button>
                  }
                >
                  <FilterExperimental />
                </FilterModal>
              </>
            ),
            det: (
              <>
                {experimental ? 'True' : 'False'}
                {experimental && (
                  <Flask
                    size={34}
                    weight="bold"
                    color={'currentColor'}
                    style={{
                      position: 'relative',
                      top: '.2em',
                      right: -3,
                      fill: 'currentColor',
                    }}
                  />
                )}
              </>
            ),
          },
        ]
      : []),
    {
      term: 'Spec',
      det: (
        <a
          href={specUrl}
          target="_blank"
          className="d-flex align-items-center"
          style={{ gap: 2 }}
        >
          {getShortSpecName(statuses ? statuses[specKey] : '')}
          <ArrowUpRight
            size={37}
            weight="regular"
            style={{ marginTop: 1, marginRight: -5 }}
          />
        </a>
      ),
    },
    {
      term: (
        <>
          <span className="sr-only">Source</span>
          <FilterModal
            button={
              <button className={'round'}>
                Source <CaretDown size={25} weight="bold" />
              </button>
            }
          >
            <FilterSources />
          </FilterModal>
        </>
      ),
      det: (
        <a
          href={sourceUrl}
          target="_blank"
          className="d-flex align-items-center"
          style={{ gap: 2 }}
        >
          {source === 'mdn' ? 'MDN' : 'CANIUSE'}
          <ArrowUpRight
            size={37}
            weight="regular"
            style={{ marginTop: 1, marginRight: -5 }}
          />
        </a>
      ),
    },
  ];

  return (
    <Stats>
      {items.map(({ term, det }, i) => (
        <div className="selectable-text" key={i}>
          <dl>{term}</dl>
          <dt>{det}</dt>
        </div>
      ))}
    </Stats>
  );
};

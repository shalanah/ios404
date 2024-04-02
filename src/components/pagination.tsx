import React from 'react';
import useCanIUseContext from '../hooks/useCanIUseContext';
import styled from 'styled-components';
import { Arrow } from './arrow';
import { ZoomInIcon, ZoomOutIcon } from '@radix-ui/react-icons';

const Div = styled.div`
  position: absolute;
  left: 50%;
  transform: translate3D(-50%, 100%, 0);
  pointer-events: none;
  bottom: 0;
`;
const Button = styled.button`
  border-radius: 8px;
  color: var(--fg);
  flex-shrink: 0;
  &:focus {
    outline: 2.5px dotted currentColor;
  }
`;
const Text = styled.span`
  font-size: 0.75rem;
  white-space: nowrap;
  width: 6.5ch;
  text-align: center;
  font-variant-numeric: tabular-nums;
  font-weight: 500;
`;

export const Pagination = () => {
  const {
    setNextFeature,
    iOSMissingFeatures,
    filteredData,
    activeIndex,
    position: pos,
    paginationHeight,
  } = useCanIUseContext();

  const len = iOSMissingFeatures.length;
  const filteredLen = filteredData.length;

  if (len === 0 || activeIndex === -1 || paginationHeight === null) return null;

  let countText =
    filteredLen && pos !== -1 ? (
      <>
        {pos + 1}&nbsp;&nbsp;/&nbsp;&nbsp;
        {filteredData.length}
      </>
    ) : (
      '' // couldn't find the active on in the filtered list
    );

  let large = paginationHeight > 90;
  let arrowSize = large ? 15 : 12;
  let buttonSize = large ? 40 : 25;
  let bottom = large ? paginationHeight * 0.75 : paginationHeight / 2;
  // center vertically if smaller
  let transform = large
    ? 'translate3D(-50%, 100%, 0)'
    : 'translate3D(-50%, 50%, 0)';

  return (
    <Div style={{ height: buttonSize, bottom, transform }}>
      <div
        style={{ gap: 20 }}
        className="d-flex pos-center align-items-center"
        // style={{ bottom: paginationHeight ?? 0 }}
      >
        <Button
          style={{ width: buttonSize, height: buttonSize }}
          onClick={() =>
            setNextFeature({
              forwards: false,
              featureActive: false,
              action: 'arrows',
            })
          }
          className="d-flex justify-content-center align-items-center justify-content-center"
        >
          <Arrow left size={arrowSize} />
          <span className="sr-only">previous</span>
        </Button>
        <Text>{countText}</Text>
        <Button
          style={{ width: buttonSize, height: buttonSize }}
          className="d-flex justify-content-center align-items-center"
          onClick={() =>
            setNextFeature({
              forwards: true,
              featureActive: false,
              action: 'arrows',
            })
          }
        >
          <Arrow right size={arrowSize} />
          <span className="sr-only">next</span>
        </Button>
      </div>
    </Div>
  );
};

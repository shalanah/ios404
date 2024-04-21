import React from 'react';
import { Checkbox } from '../components/checkbox';
import useMainContext from '../hooks/useMainContext';
import { Badge } from '../components/badge';
import styled from 'styled-components';
import { FiltersType } from '../hooks/useFilters';
import { typedEntries, typedFromEntries, typedKeys } from '@/utils/ts';

export type SpecTypes = keyof FiltersType['statuses'];

const Submit = styled.button`
  display: block;
  padding: 8px 15px;
  text-align: center;
  border-radius: 8px;
  width: 100%;
  border: 1px solid currentColor;
  font-size: 0.95rem;
  display: flex;
  gap: 10px;
  align-items: baseline;
  justify-content: space-between;
  font-variant-numeric: tabular-nums;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1);
  }
`;
const Header = styled.header`
  color: var(--titleFg);
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  gap: 3px;
  h4 {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  p {
    opacity: 0.8;
    font-size: 0.7rem;
    line-height: 1.25;
  }
`;
const Section = styled.section`
  padding: 5px 0;
`;
const H2 = styled.h2`
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;
const LabelWithBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const Hr = styled.hr`
  border: 0;
  border-top: 1px dotted var(--modalHr);
  margin: 10px 0 15px;
`;

export const FilterSpecs = ({ onClose }: { onClose?: () => void }) => {
  const { filteredBeforeSpecs, statuses, filters, setFilters, filteredData } =
    useMainContext();
  const statusCounts: Record<SpecTypes, number> = filteredBeforeSpecs.reduce(
    (acc: Record<SpecTypes, number>, v: { specKey: SpecTypes } & any) => {
      acc[v.specKey as SpecTypes] += 1;
      return acc;
    },
    typedFromEntries(typedKeys(statuses || {}).map((k) => [k, 0])) as Record<
      SpecTypes,
      number
    >
  );
  const nonEmptyStatusFilters = typedFromEntries(
    typedEntries(filters.statuses).filter(([k, _]) => {
      return statusCounts[k as SpecTypes] > 0;
    })
  );
  const len = Object.keys(nonEmptyStatusFilters).length;
  const numChecked = Object.values(nonEmptyStatusFilters).filter(
    (v) => v
  ).length;
  const indeterminate = numChecked !== len && numChecked > 0;
  const allChecked = numChecked === len;
  const checked = allChecked || (numChecked < len / 2 && numChecked > 0);
  // TODO: Make sure we have SOME BROWSERS
  const filteredTotal = filteredData.length;
  return (
    <>
      {/* TODO: Add MDN vs Caniuse here */}
      {/* <Hr /> */}
      <H2>Specifications</H2>
      <Section>
        <Checkbox
          indeterminate={indeterminate}
          onCheckedChange={() => {
            setFilters((prev: any) => {
              return {
                ...prev,
                statuses: Object.fromEntries(
                  Object.keys(prev.statuses).map((k) => [k, !checked])
                ),
              };
            });
          }}
          checked={checked}
        >
          All Specifications
        </Checkbox>
      </Section>
      {[
        {
          title: 'W3C',
          description: 'Standards + specs since 1994',
          filterFn: (v: string) => {
            return v.startsWith('W3C');
          },
          nameFormat: (v: string) => {
            return v
              .replace('W3C ', '')
              .replace('Candidate Recommendation', 'Candidate')
              .replace('Proposed Recommendation', 'Proposed')
              .replace('Working Draft', 'Draft');
          },
        },
        {
          title: 'WHATWG',
          description: 'Evolving standards since 2004',
          filterFn: (v: string) => {
            return v.startsWith('WHATWG');
          },
          nameFormat: (v: string) => {
            return v.replace('WHATWG ', '');
          },
        },
        {
          title: 'More',
          filterFn: (v: string) => {
            return !(v.startsWith('W3C') || v.startsWith('WHATWG'));
          },
          nameFormat: (v: string) => {
            return v;
          },
        },
      ].map(({ title, description, filterFn, nameFormat }, i) => {
        return (
          <Section key={i}>
            {(title || description) && (
              <Header>
                {title && <h4>{title}</h4>}
                {description && <p>{description}</p>}
              </Header>
            )}
            {typedEntries(statusCounts).map(([k, v], i) => {
              const checked = filters.statuses[k as SpecTypes];
              // @ts-ignore
              if (!filterFn(statuses?.[k] || '')) return null;
              return (
                <Checkbox
                  key={k}
                  checked={checked}
                  indeterminate={false}
                  onCheckedChange={(checked) => {
                    setFilters((prev: any) => {
                      return {
                        ...prev,
                        statuses: {
                          ...prev.statuses,
                          [k]: checked,
                        },
                      };
                    });
                  }}
                >
                  <LabelWithBadge>
                    <Badge active={checked}>{v}</Badge>
                    {/* @ts-ignore */}
                    <span>{nameFormat(statuses?.[k] || '')}</span>
                  </LabelWithBadge>
                </Checkbox>
              );
            })}
          </Section>
        );
      })}
      <Submit onClick={onClose}>
        Close{' '}
        <span style={{ fontSize: '.8em' }}>
          Matches {filteredTotal} {filteredTotal === 1 ? 'feature' : 'features'}
        </span>
      </Submit>
    </>
  );
};

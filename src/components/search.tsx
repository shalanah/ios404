import React, { useRef } from 'react';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import useCanIUseContext from '../hooks/useCanIUseContext';
import styled from 'styled-components';

const Input = styled.input`
  padding: 10px 10px 10px 38px;
  border-radius: 12px;
  border: 1px solid var(--modalHr);
  font-size: 16px;
  width: 100%;
  background: var(--modalBg);
  color: var(--color);
  &::placeholder {
    color: var(--color);
  }
`;

export const Search = () => {
  const { search, setSearch } = useCanIUseContext();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div style={{ position: 'relative' }}>
      <Input
        ref={ref}
        type="search"
        placeholder="Search"
        value={search}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setSearch('');
          }
          if (e.key === 'Enter') {
            e.currentTarget.blur();
          }
        }}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <span
        aria-label="Search"
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          left: 12,
          top: 11,
        }}
      >
        <MagnifyingGlassIcon width={20} height={20} />
      </span>
      {search && (
        <button
          style={{
            position: 'absolute',
            right: 10,
            top: 9,
            borderRadius: '50%',
            width: 22,
            height: 22,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            setSearch('');
            ref?.current?.focus(); // focus back on input
          }}
        >
          <Cross2Icon />
        </button>
      )}
    </div>
  );
};

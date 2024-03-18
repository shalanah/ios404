import React from 'react';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import useCanIUseContext from '../hooks/useCanIUseContext';
import styled from 'styled-components';

const Input = styled.input`
  padding: 8px 10px 8px 35px;
  height: 33px;
  border-radius: 12px;
  border: 1px solid var(--modalHr);
  font-size: 0.8rem;
  width: 100%;
  background: var(--modalBg);
  color: var(--color);
  &::placeholder {
    color: var(--color);
  }
`;

export const Search = () => {
  const { search, setSearch } = useCanIUseContext();
  return (
    <div style={{ position: 'relative' }}>
      <Input
        type="search"
        placeholder="Search"
        value={search}
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
          top: 8,
        }}
      >
        <MagnifyingGlassIcon width={18} height={18} />
      </span>
      {search && (
        <button
          style={{
            position: 'absolute',
            right: 10,
            top: 8,
            borderRadius: '50%',
            width: 18,
            height: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setSearch('')}
        >
          <Cross2Icon />
        </button>
      )}
    </div>
  );
};

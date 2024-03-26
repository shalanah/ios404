import useCanIUseContext from '../hooks/useCanIUseContext';
import styled from 'styled-components';

const Div = styled.div`
  font-size: 0.9rem;
`;

export default function FeaturesEmpty() {
  const { filteredData, search, filters, loading } = useCanIUseContext();

  const matches = filteredData.length > 0;
  if (loading || matches) return null;

  const hasSearch = search.trim().length > 0;
  const hasSpecFilters = Object.values(filters.statuses).some((v) => !v);
  const hasNoBrowsers = Object.values(filters.browsers).every((v) => !v);

  // Cannot have any features without a comparison browser
  if (hasNoBrowsers) return <Div>Select a comparison browser.</Div>;

  if (hasSearch && hasSpecFilters)
    return <Div>Clear search and/or add specifications.</Div>;

  if (hasSearch) return <Div>Clear search.</Div>;
  if (hasSpecFilters) return <Div>Add more specifications.</Div>;

  return null;
}

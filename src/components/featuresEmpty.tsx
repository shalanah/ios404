import useCanIUseContext from '../hooks/useCanIUseContext';

export default function FeaturesEmpty() {
  const { filteredData, search, filters, loading } = useCanIUseContext();

  const matches = filteredData.length > 0;
  if (loading || matches) return null;

  const hasSearch = search.trim().length > 0;
  const hasFilters = Object.values(filters.statuses).some((v) => !v);

  if (hasSearch && hasFilters) {
    return (
      <>
        No matches found.
        <br />
        Clear search and/or filters.
      </>
    );
  }

  if (hasSearch)
    return (
      <>
        No matches found.
        <br />
        Clear search.
      </>
    );

  if (hasFilters)
    return (
      <>
        No matches found.
        <br />
        Clear filters.
      </>
    );

  return null;
}

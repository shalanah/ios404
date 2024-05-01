import { FiltersType } from '@/hooks/useFilters';
import { MissingFeatureIndexType } from './missingFeature';
import { typedEntries } from './ts';

export const getFilteredData = ({
  filters,
  missingFeatures,
  search,
  activeIndex,
}: {
  filters: FiltersType;
  missingFeatures: MissingFeatureIndexType[];
  search: string;
  activeIndex: number;
}) => {
  const hasBrowsers = Object.values(filters.browsers).some((v) => v);

  // 1. Filter by selected sources + experimental
  const filterSources = missingFeatures.filter(({ source, experimental }) => {
    return (
      filters.sources[source] && (filters.experimental ? true : !experimental)
    );
  });

  // 2. Filter by selected browsers
  // Don't want to apply all the specs yet so we can show counts for each in specs modal
  const filteredBeforeSpecs = filterSources.filter((v) => {
    return hasBrowsers
      ? typedEntries(filters.browsers)
          .filter(([_, on]) => on)
          .every(([k, on]) => {
            return on && v.browsers[k].betterSupport;
          })
      : false;
  });

  // 3. Filter by specs
  // Final filtered data (apply specs)
  let filteredData = filteredBeforeSpecs.filter((v) => {
    return filters.statuses[v.specKey as keyof FiltersType['statuses']];
  });

  // 4. Filter by search
  if (search.trim().length > 0) {
    const searchLower = search.trim().toLowerCase();
    filteredData = filteredData.filter((v) => {
      return v.title.toLowerCase().includes(searchLower);
    });
  }

  // actual position in list --- active index + prev active is out of the WHOLE non-filtered list
  const position = filteredData.findIndex((v) => v.index === activeIndex);

  return {
    filteredData,
    filteredBeforeSpecs,
    position,
    activeInFilteredData: filteredData && position !== -1,
  };
};

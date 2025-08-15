import { useState, useMemo } from 'react';

export interface FilterConfig<T = any> {
  key: keyof T;
  label: string;
  options: string[];
}

export interface DashboardConfig<T = any> {
  filters: FilterConfig<T>[];
  defaultView?: 'visual' | 'table';
  searchFields?: (keyof T)[];
}

export function useDashboardFilters<T>(
  data: T[],
  config: DashboardConfig<T>
) {
  const [viewMode, setViewMode] = useState<'visual' | 'table'>(
    config.defaultView || 'visual'
  );
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply active filters
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value !== 'all' && value !== '') {
        filtered = filtered.filter(item => 
          String(item[key as keyof T]) === value
        );
      }
    });

    // Apply search
    if (searchTerm && config.searchFields) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        config.searchFields!.some(field =>
          String(item[field]).toLowerCase().includes(searchLower)
        )
      );
    }

    return filtered;
  }, [data, activeFilters, searchTerm, config.searchFields]);

  const setFilter = (key: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilter = (key: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  const applyFilterAndSwitchView = (key: string, value: string) => {
    setFilter(key, value);
    setViewMode('table');
  };

  return {
    viewMode,
    setViewMode,
    activeFilters,
    searchTerm,
    setSearchTerm,
    filteredData,
    setFilter,
    clearFilter,
    clearAllFilters,
    applyFilterAndSwitchView,
    hasActiveFilters: Object.keys(activeFilters).length > 0
  };
}
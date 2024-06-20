import { QueryOptions, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "./useDebounce";

type QueryKey = string | number | boolean | undefined;
export type UsePaginatedQueryOptions<T> = {
  queryKey: QueryKey[];
  fetch: (page: number, search?: string) => Promise<T>;
};

export const usePaginatedQuery = <T = any>(
  p: UsePaginatedQueryOptions<T>,
  q: QueryOptions<T> = {}
) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearchValue = useDebounce(search, 500);

  const query = useQuery<T>({
    queryKey: [...p.queryKey, page, debounceSearchValue],
    queryFn: () => p.fetch(page, debounceSearchValue),
    ...q,
    refetchOnWindowFocus: false,
  });

  const handleSearchQueryChange = (value: string) => {
    setSearch(value);
  };

  const handlePageChange = (newPage?: number) => {
    if (newPage) setPage(newPage);

    query.refetch();
  };

  return {
    page,
    handlePageChange: (page: number) => handlePageChange(page),
    searchQuery: search,
    handleSearchQueryChange,
    ...query,
    refetch: handlePageChange,
  };
};

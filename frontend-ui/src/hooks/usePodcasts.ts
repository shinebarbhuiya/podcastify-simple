import { useState, useEffect } from 'react';
import axios from 'axios';
import { Podcast, SearchParams } from '../types/podcast';

// const API_URL = 'https://601f1754b5a0e9001706a292.mockapi.io/podcasts';
// const API_URL = 'http://localhost:8080/api/v1/podcasts';

const API_URL = import.meta.env.PROD
  ? 'https://podcastify-api.imshine.one/api/v1/podcasts'
  : 'http://localhost:8080/api/v1/podcasts';

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<{ status?: number; message: string } | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    limit: 9
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [totalCount, setTotalCount] = useState<number>(0);

  // Debounce search term
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Update search params when debounced search term changes
  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchParams(prev => ({
        ...prev,
        search: debouncedSearchTerm
      }));
    } else {
      const { search, ...rest } = searchParams;
      setSearchParams(rest);
    }
  }, [debouncedSearchTerm]);

  // Fetch podcasts
  useEffect(() => {
    const fetchPodcasts = async () => {
      setIsLoading(true);
      setIsError(false);
      setError(null);

      try {
        const queryParams = new URLSearchParams();
        
        if (searchParams.search) {
          queryParams.append('search', searchParams.search);
        }
        
        if (searchParams.title) {
          queryParams.append('title', searchParams.title);
        }
        
        if (searchParams.categoryName) {
          queryParams.append('categoryName', searchParams.categoryName);
        }
        
        if (searchParams.page) {
          queryParams.append('page', searchParams.page.toString());
        }
        
        if (searchParams.limit) {
          queryParams.append('limit', searchParams.limit.toString());
        }

        const queryString = queryParams.toString();
        const url = queryString ? `${API_URL}?${queryString}` : API_URL;
        
        const response = await axios.get<{
          podcasts: Podcast[];
          total: number;
          page: number;
          limit: number;
        }>(url);
        setPodcasts(response.data.podcasts);
        setTotalCount(response.data.total);
      } catch (err) {
        setIsError(true);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 429) {
            setError({
              status: 429,
              message: "Rate limit exceeded. Please try again later."
            });
          } else {
            setError({
              status: err.response?.status,
              message: "Failed to fetch podcasts. Please try again."
            });
          }
        } else {
          setError({
            message: "An unexpected error occurred. Please try again."
          });
        }
        setPodcasts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPodcasts();
  }, [searchParams]);

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const updateCategory = (category: string) => {
    setSearchParams(prev => ({
      ...prev,
      categoryName: category || undefined,
      page: 1
    }));
  };

  const updatePage = (page: number) => {
    setSearchParams(prev => ({
      ...prev,
      page
    }));
  };

  return {
    podcasts,
    isLoading,
    isError,
    error,
    searchTerm,
    updateSearchTerm,
    updateCategory,
    updatePage,
    currentPage: searchParams.page || 1,
    totalCount
  };
};
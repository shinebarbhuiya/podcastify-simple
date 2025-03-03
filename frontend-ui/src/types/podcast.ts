export interface PodcastImage {
  default: string;
  featured: string;
  thumbnail: string;
  wide: string;
}

export interface Podcast {
  id: string;
  title: string;
  images: PodcastImage;
  isExclusive: boolean;
  publisherName: string;
  publisherId: string;
  mediaType: string;
  description: string;
  categoryId: string;
  categoryName: string;
  hasFreeEpisodes: boolean;
  playSequence: string;
}

export interface PodcastsResponse {
  data: Podcast[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

export interface SearchParams {
  search?: string;
  title?: string;
  categoryName?: string;
  page?: number;
  limit?: number;
}

export interface PodcastListProps {
  podcasts: Podcast[];
  isLoading: boolean;
  isError: boolean;
  error?: {
    status?: number;
    message: string;
  } | null;
}
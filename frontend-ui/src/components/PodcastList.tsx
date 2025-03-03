import React from "react";
import { Podcast } from "../types/podcast";
import PodcastCard from "./PodcastCard";
import { Loader, SearchX, Clock } from "lucide-react";

interface PodcastListProps {
  podcasts: Podcast[];
  isLoading: boolean;
  isError: boolean;
  error?: { status?: number; message?: string };
}

const PodcastList: React.FC<PodcastListProps> = ({
  podcasts,
  isLoading,
  isError,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader className="h-12 w-12 text-purple-500 animate-spin mb-4" />
        <p className="text-gray-600 text-lg">Loading podcasts...</p>
      </div>
    );
  }

  if (isError) {
    if (error?.status === 429) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="bg-yellow-100 p-6 rounded-2xl mb-4">
            <Clock className="w-32 h-32 text-yellow-500 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Whoa, Not So Fast!
          </h3>
          <p className="text-gray-600 max-w-md">
            We're experiencing high traffic right now. Please wait a moment
            before trying again.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This helps us ensure a smooth experience for all users.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-red-100 p-6 rounded-2xl mb-4">
          <svg
            className="w-32 h-32 mx-auto"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" className="stroke-red-300" />
            <line x1="12" y1="8" x2="12" y2="12" className="stroke-red-500" />
            <line
              x1="12"
              y1="16"
              x2="12.01"
              y2="16"
              className="stroke-red-500"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 max-w-md">
          We couldn't load the podcasts. Please try again later.
        </p>
      </div>
    );
  }

  if (podcasts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-yellow-100 p-6 rounded-2xl mb-4">
          <SearchX className="w-32 h-32 text-yellow-500 mx-auto" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No podcasts found
        </h3>
        <p className="text-gray-600 max-w-md">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {podcasts.map((podcast) => (
        <PodcastCard key={podcast.id} podcast={podcast} />
      ))}
    </div>
  );
};

export default PodcastList;
